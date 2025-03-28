"use client";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/useSettings";
import ThemeToggle from "@/components/ThemeToggle";
import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";

const SettingModal = () => {
  const { isOpen, onClose } = useSettings();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearence</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize How MindCanvas Looks On Your Device
            </span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
