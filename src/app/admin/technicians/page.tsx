"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Wrench, ShieldAlert, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { technicianService, Technician } from "@/services/technicianService";

export default function TechnicianListPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
    region: "",
    skills: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTechnicians = async () => {
    try {
      setIsLoading(true);
      const params = searchQuery ? { search: searchQuery } : undefined;
      const response = await technicianService.getTechnicians(params);
      setTechnicians(response.results || []);
    } catch (error) {
      console.error("Failed to fetch technicians:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, [searchQuery]);

  const handleCreateTechnician = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await technicianService.createTechnician({
        email: formData.email,
        full_name: formData.full_name,
        phone: formData.phone,
        password: formData.password,
        technician_profile: {
          region: formData.region,
          skills: formData.skills,
          status: 'AVAILABLE'
        }
      } as any);
      setIsAddModalOpen(false);
      setFormData({
        email: "",
        full_name: "",
        phone: "",
        password: "",
        region: "",
        skills: "",
      });
      fetchTechnicians();
    } catch (error) {
      console.error("Failed to create technician:", error);
      alert("Failed to create technician. Please check the inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTechnicianStatus = async (technician: Technician) => {
    try {
      const newStatus = technician.is_active ? false : true;
      await technicianService.updateTechnician(technician.id, { is_active: newStatus });
      fetchTechnicians();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDeleteTechnician = async (technicianId: string) => {
    if (window.confirm("Are you sure you want to delete this technician? This action cannot be undone.")) {
      try {
        await technicianService.deleteTechnician(technicianId);
        fetchTechnicians();
      } catch (error) {
        console.error("Failed to delete technician:", error);
        alert("Failed to delete technician. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Technician Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your service technicians, onboard new team members, and track performance.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          Add Technician
        </Button>
      </div>

      {/* Main content */}
      <Card className="p-0 overflow-hidden border-none shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="font-semibold text-gray-700 dark:text-gray-300">All Technicians</h2>
          <div className="w-full sm:w-96 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name, email, or region..."
              className="pl-9 bg-white dark:bg-[#0a0a0a]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <thead>
            <tr>
              <th className="text-left">Technician</th>
              <th className="text-left">Skills / Region</th>
              <th className="text-left">Status</th>
              <th className="text-left">Joined Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  Loading technicians...
                </td>
              </tr>
            ) : technicians.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  <Wrench className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>No technicians found.</p>
                </td>
              </tr>
            ) : (
              technicians.map((technician) => (
                <tr key={technician.id}>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {technician.full_name || 'No Name'}
                      </span>
                      <span className="text-sm text-gray-500">{technician.email}</span>
                      <span className="text-sm text-gray-400">{technician.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {technician.technician_profile?.skills || 'N/A'}
                      </span>
                      <span className="text-sm text-gray-500">
                        Region: {technician.technician_profile?.region || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={technician.is_active ? 'success' : 'danger'}>
                      {technician.is_active ? 'Active' : 'Blocked'}
                    </Badge>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(technician.created_at).toLocaleDateString()}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant={technician.is_active ? 'danger' : 'success'} 
                        size="sm"
                        onClick={() => toggleTechnicianStatus(technician)}
                        title={technician.is_active ? "Block Technician" : "Activate Technician"}
                        className="gap-1.5"
                      >
                        {technician.is_active ? (
                          <><ShieldAlert className="w-4 h-4" /> Block</>
                        ) : (
                          <><CheckCircle2 className="w-4 h-4" /> Activate</>
                        )}
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDeleteTechnician(technician.id)}
                        title="Delete Technician"
                        className="gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Add Technician Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Technician"
      >
        <form onSubmit={handleCreateTechnician} className="space-y-4 mt-4">
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
            <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Profile Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-white"
                >
                  <option value="" disabled>Select Region</option>
                  <option value="DHAKA_NORTH">Dhaka North</option>
                  <option value="DHAKA_SOUTH">Dhaka South</option>
                  <option value="CHATTOGRAM">Chattogram</option>
                  <option value="SYLHET">Sylhet</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <Input
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="RO Purifier, Installation"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Create Technician
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
