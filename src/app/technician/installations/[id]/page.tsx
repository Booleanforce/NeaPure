"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, MapPin, Phone, CheckCircle, Clock, 
  Camera, CheckSquare, PenTool, XCircle, FileImage 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { installationsService, InstallationRequest } from "@/services/installations";

export default function TechnicianJobDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [job, setJob] = useState<InstallationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoType, setPhotoType] = useState<"BEFORE" | "AFTER">("BEFORE");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  
  // Basic checklist state
  const [checklist, setChecklist] = useState({
    site_inspected: false,
    plumbing_ready: false,
    unit_installed: false,
    water_tested: false,
    leaks_checked: false,
    customer_briefed: false
  });

  useEffect(() => {
    fetchJob();
  }, [resolvedParams.id]);

  const fetchJob = async () => {
    try {
      const response = await installationsService.getRequestById(parseInt(resolvedParams.id));
      setJob(response);
    } catch (error) {
      console.error("Failed to fetch job", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: () => Promise<any>, successMessage: string) => {
    setIsSubmitting(true);
    try {
      await action();
      await fetchJob();
    } catch (error) {
      alert("Action failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return;
    setIsSubmitting(true);
    try {
      await installationsService.uploadPhoto(job!.id, photoType, photoFile);
      setPhotoFile(null);
      await fetchJob();
    } catch (error) {
      alert("Failed to upload photo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitChecklist = async () => {
    setIsSubmitting(true);
    try {
      await installationsService.submitChecklist(job!.id, checklist);
      await fetchJob();
    } catch (error) {
      alert("Failed to submit checklist");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadSignature = async () => {
    if (!signatureFile) return;
    setIsSubmitting(true);
    try {
      await installationsService.submitSignature(job!.id, signatureFile);
      setSignatureFile(null);
      await fetchJob();
    } catch (error) {
      alert("Failed to upload signature");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading job details...</div>;
  if (!job) return <div className="p-4 text-center">Job not found</div>;

  const hasBeforePhoto = job.photos?.some(p => p.photo_type === 'BEFORE');
  const hasAfterPhoto = job.photos?.some(p => p.photo_type === 'AFTER');
  const hasChecklist = !!job.checklist;
  const hasSignature = !!job.signature;
  const canComplete = hasBeforePhoto && hasAfterPhoto && hasChecklist && hasSignature;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Job #{job.id}</h1>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">{job.customer_name}</h2>
            <p className="text-sm text-gray-500">Product ID: {job.registered_product}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>Address hidden (Backend integration pending)</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>Contact hidden</span>
          </div>
        </CardContent>
      </Card>

      {/* State Machine UI */}
      <div className="space-y-4">
        {job.status === 'ASSIGNED' || job.status === 'RESCHEDULED' ? (
          <div className="flex gap-3">
            <Button 
              variant="danger" 
              className="flex-1" 
              disabled={isSubmitting}
              onClick={() => handleAction(() => installationsService.rejectJob(job.id, { reason: "Schedule conflict" }), "Rejected")}
            >
              <XCircle className="w-4 h-4 mr-2" /> Reject
            </Button>
            <Button 
              variant="success" 
              className="flex-1" 
              disabled={isSubmitting}
              onClick={() => handleAction(() => installationsService.acceptJob(job.id), "Accepted")}
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Accept
            </Button>
          </div>
        ) : job.status === 'ACCEPTED' ? (
          <Button 
            variant="primary" 
            className="w-full h-12 text-lg" 
            disabled={isSubmitting}
            onClick={() => handleAction(() => installationsService.checkIn(job.id, { location: "GPS Coord Placeholder" }), "Checked In")}
          >
            <MapPin className="w-5 h-5 mr-2" /> Check In at Site
          </Button>
        ) : job.status === 'IN_PROGRESS' ? (
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b pb-2">Execution Steps</h3>
            
            {/* Step 1: Photos */}
            <Card className="overflow-hidden border-l-4 border-l-blue-500">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-400">
                  <Camera className="w-5 h-5" /> Site Photos
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className={hasBeforePhoto ? "text-green-600" : "text-gray-500"}>
                    {hasBeforePhoto ? "✅ Before Photo" : "❌ Before Photo"}
                  </span>
                  <span className={hasAfterPhoto ? "text-green-600" : "text-gray-500"}>
                    {hasAfterPhoto ? "✅ After Photo" : "❌ After Photo"}
                  </span>
                </div>
                {(!hasBeforePhoto || !hasAfterPhoto) && (
                  <div className="flex flex-col gap-2 pt-2">
                    <select 
                      className="rounded-md border-gray-300 dark:border-gray-700 bg-transparent text-sm"
                      value={photoType}
                      onChange={(e) => setPhotoType(e.target.value as "BEFORE"|"AFTER")}
                    >
                      {!hasBeforePhoto && <option value="BEFORE">Before Installation</option>}
                      {!hasAfterPhoto && <option value="AFTER">After Installation</option>}
                    </select>
                    <div className="flex gap-2">
                      <Input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                      <Button onClick={handleUploadPhoto} disabled={!photoFile || isSubmitting}>Upload</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 2: Checklist */}
            <Card className="overflow-hidden border-l-4 border-l-yellow-500">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-yellow-700 dark:text-yellow-400">
                  <CheckSquare className="w-5 h-5" /> Installation Checklist
                </div>
                {hasChecklist ? (
                  <div className="text-green-600 text-sm font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> Checklist submitted
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    {Object.entries(checklist).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={value} 
                          onChange={(e) => setChecklist({...checklist, [key]: e.target.checked})}
                          className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="capitalize">{key.replace('_', ' ')}</span>
                      </label>
                    ))}
                    <Button 
                      className="w-full mt-2" 
                      onClick={handleSubmitChecklist} 
                      disabled={isSubmitting || !Object.values(checklist).every(Boolean)}
                    >
                      Submit Checklist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 3: Signature */}
            <Card className="overflow-hidden border-l-4 border-l-purple-500">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-purple-700 dark:text-purple-400">
                  <PenTool className="w-5 h-5" /> Customer Signature
                </div>
                {hasSignature ? (
                  <div className="text-green-600 text-sm font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> Signature collected
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <p className="text-xs text-gray-500">Upload a photo of the signed physical document (Digital Pad coming soon).</p>
                    <div className="flex gap-2">
                      <Input type="file" accept="image/*" onChange={(e) => setSignatureFile(e.target.files?.[0] || null)} />
                      <Button onClick={handleUploadSignature} disabled={!signatureFile || isSubmitting}>Upload Sign</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Complete Job */}
            <div className="pt-4 pb-10">
              <Button 
                variant="success" 
                className="w-full h-14 text-lg font-bold shadow-lg"
                disabled={!canComplete || isSubmitting}
                onClick={() => handleAction(() => installationsService.completeJob(job.id), "Completed")}
              >
                Complete Job
              </Button>
              {!canComplete && (
                <p className="text-center text-xs text-gray-500 mt-2">
                  Complete all steps above to finish the job.
                </p>
              )}
            </div>

          </div>
        ) : job.status === 'COMPLETED' ? (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
            <div>
              <h3 className="font-bold">Job Completed</h3>
              <p className="text-sm">Great work! The admin has been notified.</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}