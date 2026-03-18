import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Briefcase,
  Users,
  Star,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const industries = [
  "Financial Services",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Technology",
  "Telecommunications",
  "Energy & Utilities",
  "Government",
  "Education",
  "Other",
];

const orgSizes = [
  "1-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1,000 employees",
  "1,001-5,000 employees",
  "5,000+ employees",
];

// Mock data
const mockOrgData = {
  name: "STC Bank",
  website: "https://www.stcbank.com",
  industry: "Financial Services",
  size: "1,001-5,000 employees",
  websiteAccuracy: 4,
  createdAt: "2024-01-15",
  updatedAt: "2024-02-20",
};

const OrganisationProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockOrgData);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(mockOrgData);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Saving organisation profile:", formData);
    // Here you would typically make an API call to save the data
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organisation Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your organisation information and settings
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={handleEdit} className="gap-2">
              <Edit2 size={18} />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel} className="gap-2">
                <X size={18} />
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2 bg-gradient-brand shadow-brand">
                <Save size={18} />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Organisation Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Organisation Details</CardTitle>
              <CardDescription>
                Basic information about your organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Organisation Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 size={16} className="text-muted-foreground" />
                    Organisation Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter organisation name"
                    />
                  ) : (
                    <p className="text-base text-foreground">{formData.name}</p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Globe size={16} className="text-muted-foreground" />
                    Website
                  </label>
                  {isEditing ? (
                    <Input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://www.example.com"
                    />
                  ) : (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-primary hover:underline"
                    >
                      {formData.website}
                    </a>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase size={16} className="text-muted-foreground" />
                    Industry
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Badge variant="secondary" className="text-sm font-normal">
                      {formData.industry}
                    </Badge>
                  )}
                </div>

                {/* Organisation Size */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Users size={16} className="text-muted-foreground" />
                    Organisation Size
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {orgSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Badge variant="secondary" className="text-sm font-normal">
                      {formData.size}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Website Accuracy Card */}
          <Card>
            <CardHeader>
              <CardTitle>Website Accuracy</CardTitle>
              <CardDescription>
                How accurate is the information on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div>
                  <div className="flex items-center justify-center gap-3 rounded-lg border border-border bg-accent/30 p-6">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, websiteAccuracy: rating })}
                        className={`transition-all ${
                          rating <= formData.websiteAccuracy
                            ? "text-yellow-500"
                            : "text-muted-foreground/30"
                        } hover:scale-110`}
                      >
                        <Star
                          size={40}
                          fill={rating <= formData.websiteAccuracy ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Outdated</span>
                    <span>Very Accurate</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      size={24}
                      className={
                        rating <= formData.websiteAccuracy
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground/30"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({formData.websiteAccuracy} out of 5)
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Metadata Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                When this profile was created and last updated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-accent/30 p-4">
                  <Calendar size={20} className="mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Profile Created</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(formData.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-accent/30 p-4">
                  <Calendar size={20} className="mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Last Updated</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(formData.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrganisationProfile;
