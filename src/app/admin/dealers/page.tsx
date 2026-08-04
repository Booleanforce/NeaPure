"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Briefcase, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { dealerService, Dealer } from "@/services/dealerService";

export default function DealerListPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
    company_name: "",
    contact_person: "",
    trade_license: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDealers = async () => {
    try {
      setIsLoading(true);
      const params = searchQuery ? { search: searchQuery } : undefined;
      const response = await dealerService.getDealers(params);
      setDealers(response.results || []);
    } catch (error) {
      console.error("Failed to fetch dealers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, [searchQuery]);

  const handleCreateDealer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await dealerService.createDealer({
        email: formData.email,
        full_name: formData.full_name,
        phone: formData.phone,
        password: formData.password,
        dealer_profile: {
          company_name: formData.company_name,
          contact_person: formData.contact_person,
          trade_license: formData.trade_license,
          status: 'APPROVED'
        }
      } as any);
      setIsAddModalOpen(false);
      setFormData({
        email: "",
        full_name: "",
        phone: "",
        password: "",
        company_name: "",
        contact_person: "",
        trade_license: "",
      });
      fetchDealers();
    } catch (error) {
      console.error("Failed to create dealer:", error);
      alert("Failed to create dealer. Please check the inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDealerStatus = async (dealer: Dealer) => {
    try {
      const newStatus = dealer.is_active ? false : true;
      await dealerService.updateDealer(dealer.id, { is_active: newStatus });
      fetchDealers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dealer Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your dealer network, onboard new partners, and control access.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          Add Dealer
        </Button>
      </div>

      {/* Main content */}
      <Card className="p-0 overflow-hidden border-none shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300">All Dealers</h2>
          <div className="w-full sm:w-96 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name, email, or company..."
              className="pl-9 bg-white dark:bg-[#0a0a0a]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <thead>
            <tr>
              <th className="text-left">Dealer</th>
              <th className="text-left">Company</th>
              <th className="text-left">Status</th>
              <th className="text-left">Joined Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  Loading dealers...
                </td>
              </tr>
            ) : dealers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>No dealers found.</p>
                </td>
              </tr>
            ) : (
              dealers.map((dealer) => (
                <tr key={dealer.id}>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {dealer.full_name || 'No Name'}
                      </span>
                      <span className="text-sm text-gray-500">{dealer.email}</span>
                      <span className="text-sm text-gray-400">{dealer.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {dealer.dealer_profile?.company_name || 'N/A'}
                      </span>
                      <span className="text-sm text-gray-500">
                        Contact: {dealer.dealer_profile?.contact_person || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={dealer.is_active ? 'success' : 'danger'}>
                      {dealer.is_active ? 'Active' : 'Blocked'}
                    </Badge>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(dealer.created_at).toLocaleDateString()}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant={dealer.is_active ? 'danger' : 'success'} 
                        size="sm"
                        onClick={() => toggleDealerStatus(dealer)}
                        title={dealer.is_active ? "Block Dealer" : "Activate Dealer"}
                        className="gap-1.5"
                      >
                        {dealer.is_active ? (
                          <><ShieldAlert className="w-4 h-4" /> Block</>
                        ) : (
                          <><CheckCircle2 className="w-4 h-4" /> Activate</>
                        )}
                      </Button>
                      <Link href={`/admin/dealers/${dealer.id}`}>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Add Dealer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Dealer"
      >
        <form onSubmit={handleCreateDealer} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                required
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Strong password"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Company Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Acme Corp"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Person</label>
                <Input
                  value={formData.contact_person}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Trade License</label>
                <Input
                  value={formData.trade_license}
                  onChange={(e) => setFormData({ ...formData, trade_license: e.target.value })}
                  placeholder="TRD-123456789"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Create Dealer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
