"use client";

import fallbackAvatar from "@/assets/images/fallback-avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverDomain } from "@/lib/variables";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Edit, Eye, EyeOff, Lock, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { AvatarEditorDialog } from "./avatarEditDialog";

export default function Profile() {
  const token = Cookies.get("token");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPictureEditing, setIsPictureEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [updateProfileSubmitDisabled, setUpdateProfileSubmitDisabled] =
    useState(false);
  const [updatePasswordBtnDisabled, setUpdatePasswordBtnDisabled] =
    useState(false);

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${serverDomain}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      return result?.user;
    },
  });

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateProfileSubmitDisabled(true);

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const studentId = parseInt(
      (form.elements.namedItem("studentId") as HTMLInputElement).value
    );
    const batch = parseInt(
      (form.elements.namedItem("batch") as HTMLInputElement).value
    );
    const section = (
      form.elements.namedItem("section") as HTMLInputElement
    ).value
      .trim()
      .toUpperCase();

    const res = await fetch(`${serverDomain}/api/auth/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email: user?.email,
        phone,
        studentId,
        batch,
        section,
      }),
    });
    const result = await res.json();

    if (result?.ok) {
      refetch();
      setUpdateProfileSubmitDisabled(false);
      setIsEditDialogOpen(false);
      toast.success(result?.message);
    } else {
      setUpdateProfileSubmitDisabled(false);
      toast.error(result?.message);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdatePasswordBtnDisabled(true);

    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const newPassword = (
      form.elements.namedItem("newPassword") as HTMLInputElement
    ).value;
    const reTypedPassword = (
      form.elements.namedItem("reTypedPassword") as HTMLInputElement
    ).value;

    if (newPassword !== reTypedPassword) {
      setUpdatePasswordBtnDisabled(false);
      return toast.error("Passwords do not match!");
    }
    if (newPassword.length < 8) {
      setUpdatePasswordBtnDisabled(false);
      return toast.error("Password must be at least 8 characters!");
    } else if (!/[A-Z]/.test(newPassword)) {
      setUpdatePasswordBtnDisabled(false);
      return toast.error("At least one uppercase character required!");
    } else if (!/[0-9]/.test(newPassword)) {
      setUpdatePasswordBtnDisabled(false);
      return toast.error("At least one number required!");
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setUpdatePasswordBtnDisabled(false);
      return toast.error("At least one special character required!");
    }

    const res = await fetch(`${serverDomain}/api/auth/update-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password, newPassword, reTypedPassword }),
    });
    const result = await res.json();

    if (result?.ok) {
      setUpdatePasswordBtnDisabled(false);
      toast.success(result?.message);
    } else {
      setUpdatePasswordBtnDisabled(false);
      toast.error(result?.message);
    }
  };

  if (isLoading) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
      <Card>
        <CardHeader className="text-center">
          <div className="inline-block mx-auto mb-4 relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                <Image src={fallbackAvatar} alt={user?.name} />
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={() => setIsPictureEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AvatarEditorDialog
              open={isPictureEditing}
              onOpenChange={setIsPictureEditing}
              currentAvatarUrl={user?.avatar}
              userRefetch={refetch}
            />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            {user?.name}
          </CardTitle>
          <p className="text-lg text-muted-foreground mt-1 text-ellipsis overflow-hidden">
            {user?.email}
          </p>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <div className="grid grid-cols-1 xsm:grid-cols-[150px_150px] justify-around gap-4">
            <InfoItem label="Student ID" value={user?.studentId} />
            <InfoItem label="Phone" value={user?.phone || "None"} />
          </div>
          <div className="grid grid-cols-1 xsm:grid-cols-[150px_150px] justify-around gap-4">
            <InfoItem label="Batch" value={user?.batch} />
            <InfoItem label="Section" value={user?.section || "None"} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Edit className="mr-2 h-4 w-4" /> Update Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-48px)] rounded-lg">
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    defaultValue={user?.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    pattern="01[0-9]{9}"
                    maxLength={11}
                    defaultValue={user?.phone}
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    type="number"
                    min={1000000000}
                    max={9999999999}
                    defaultValue={user?.studentId}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch</Label>
                    <Input
                      id="batch"
                      type="number"
                      min={10}
                      max={99}
                      defaultValue={user?.batch}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">
                      Section{" "}
                      <span className="text-xs xsm:text-sm text-primary italic">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="section"
                      type="text"
                      maxLength={1}
                      defaultValue={user?.section}
                      placeholder="A"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateProfileSubmitDisabled}>
                    {updateProfileSubmitDisabled ? "Updating..." : "Update"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Lock className="mr-2 h-5 w-5" /> Update Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            id="updatePasswordForm"
            onSubmit={handlePasswordUpdate}
          >
            <div className="space-y-2">
              <Label htmlFor="password">Current Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reTypedPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="reTypedPassword"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <div
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-primary cursor-pointer select-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="submit"
            form="updatePasswordForm"
            disabled={updatePasswordBtnDisabled}
          >
            {updatePasswordBtnDisabled ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-lg">{value}</span>
    </div>
  );
}
