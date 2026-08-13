"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { installationsService, InstallationRequest } from "@/services/installations";

export default function TechnicianJobList() {
  const [jobs, setJobs] = useState<InstallationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // The backend filters jobs assigned to this technician
      const response = await installationsService.getRequests();
      const data = (response as any).results ? (response as any).results : response;
      setJobs(data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ASSIGNED': return <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">New Assignment</Badge>;
      case 'ACCEPTED': return <Badge variant="default" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Accepted</Badge>;
      case 'IN_PROGRESS': return <Badge variant="default" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">In Progress</Badge>;
      case 'COMPLETED': return <Badge variant="success">Completed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Assigned Jobs</h1>
      
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-800">
          No assigned jobs at the moment.
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/technician/installations/${job.id}`}>
              <Card className="hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {job.customer_name || 'Customer'}
                      </h3>
                      <p className="text-xs text-gray-500">Req #{job.id}</p>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                      <span className="truncate">View Address inside</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                      <span>{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
