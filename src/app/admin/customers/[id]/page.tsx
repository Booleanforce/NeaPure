"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, MapPin, Package, Phone, Mail, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { customerService, Customer } from "@/services/customerService";

export default function CustomerDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomer();
  }, [resolvedParams.id]);

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await customerService.getCustomer(Number(resolvedParams.id));
      setCustomer(response);
    } catch (err: any) {
      setError(err.message || "Failed to load customer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading customer details...</div>;
  }

  if (error || !customer) {
    return (
      <div className="p-8 text-center text-red-500">
        {error || "Customer not found"}
        <div className="mt-4">
          <Link href="/admin/customers">
            <Button variant="outline">Back to Customers</Button>
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'No Name Provided';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            {fullName}
            <Badge variant={customer.is_active ? 'success' : 'default'}>
              {customer.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customer ID: #{customer.id} • Joined {new Date(customer.created_at).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-900 dark:text-gray-100">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-900 dark:text-gray-100">
                  {customer.profile?.phone || customer.phone || 'Not provided'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Address & GPS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customer.addresses && customer.addresses.length > 0 ? (
                customer.addresses.map((address) => (
                  <div key={address.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3 text-sm mb-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {address.full_address || `${address.area}, ${address.city}`}
                      </span>
                    </div>
                    {(address.latitude || address.longitude) && (
                      <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded ml-7">
                        <MapPin className="h-3 w-3" />
                        Lat: {address.latitude}, Lng: {address.longitude}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No addresses registered.</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Products & History */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Product Ownership</CardTitle>
              <Button variant="outline" size="sm">
                <Package className="mr-2 h-4 w-4" />
                Register Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 py-4 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
                No products registered to this customer yet.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer History & Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 relative">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full shrink-0 z-10">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="absolute left-[15px] top-8 bottom-[-24px] w-px bg-gray-200 dark:bg-gray-800" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Account Created</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(customer.created_at).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mt-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                      Customer was onboarded into the system via Dealer #{customer.profile?.registered_by || 'Unknown'}.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
