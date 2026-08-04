"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, MapPin, Briefcase, Phone, Mail, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { dealerService, Dealer } from "@/services/dealerService";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

export default function DealerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Dealer>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDealer = async () => {
    try {
      setIsLoading(true);
      const response = await dealerService.getDealer(resolvedParams.id);
      setDealer(response);
      setFormData(response);
    } catch (error) {
      console.error("Failed to fetch dealer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDealer();
  }, [resolvedParams.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealer) return;
    
    try {
      setIsSubmitting(true);
      const updateData = {
        full_name: formData.full_name,
        phone: formData.phone,
        dealer_profile: {
          company_name: formData.dealer_profile?.company_name,
          contact_person: formData.dealer_profile?.contact_person,
          trade_license: formData.dealer_profile?.trade_license,
          status: formData.dealer_profile?.status || dealer.dealer_profile?.status || 'APPROVED'
        }
      };
      await dealerService.updateDealer(dealer.id, updateData as any);
      setIsEditModalOpen(false);
      fetchDealer();
    } catch (error) {
      console.error("Failed to update dealer:", error);
      alert("Failed to update dealer details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-gray-500">Loading dealer details...</p>
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center space-y-4">
        <p className="text-gray-500">Dealer not found.</p>
        <Link href="/admin/dealers">
          <Button variant="outline">Back to Dealers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/dealers">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            {dealer.full_name}
            <Badge variant={dealer.is_active ? 'success' : 'danger'}>
              {dealer.is_active ? 'Active' : 'Blocked'}
            </Badge>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Dealer ID: {dealer.id}
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsEditModalOpen(true)} className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <Card className="p-5 space-y-6">
            <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Email Address</p>
                  <p className="text-sm text-gray-500">{dealer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Phone Number</p>
                  <p className="text-sm text-gray-500">{dealer.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Joined Date</p>
                  <p className="text-sm text-gray-500">{new Date(dealer.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Company Details & Stats */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Company Details
            </h3>
            {dealer.dealer_profile ? (
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Company Name
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">{dealer.dealer_profile.company_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                    <User className="w-4 h-4" /> Contact Person
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">{dealer.dealer_profile.contact_person || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Trade License
                  </p>
                  <p className="text-gray-900 dark:text-gray-100 font-mono text-sm">{dealer.dealer_profile.trade_license || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Approval Status</p>
                  <Badge variant={
                    dealer.dealer_profile.status === 'APPROVED' ? 'success' : 
                    dealer.dealer_profile.status === 'REJECTED' ? 'danger' : 'warning'
                  }>
                    {dealer.dealer_profile.status || 'PENDING'}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No company profile data available.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Dealer Details"
      >
        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                required
                value={formData.full_name || ""}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Company Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={formData.dealer_profile?.company_name || ""}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dealer_profile: { ...formData.dealer_profile, company_name: e.target.value } as any
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Person</label>
                <Input
                  value={formData.dealer_profile?.contact_person || ""}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dealer_profile: { ...formData.dealer_profile, contact_person: e.target.value } as any
                  })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Trade License</label>
                <Input
                  value={formData.dealer_profile?.trade_license || ""}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dealer_profile: { ...formData.dealer_profile, trade_license: e.target.value } as any
                  })}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
