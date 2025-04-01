
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type AddCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCategory: (category: {
    category: string;
    spent: number;
    limit: number;
    color: string;
    icon: React.ReactNode;
  }) => void;
  iconOptions: { name: string; icon: React.ReactNode }[];
  colorOptions: { name: string; value: string }[];
};

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  open,
  onOpenChange,
  onAddCategory,
  iconOptions,
  colorOptions
}) => {
  const [name, setName] = useState('');
  const [spent, setSpent] = useState('0');
  const [limit, setLimit] = useState('0');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !spent || !limit || !selectedIcon || !selectedColor) {
      return;
    }
    
    const selectedIconObj = iconOptions.find(icon => icon.name === selectedIcon);
    const selectedColorObj = colorOptions.find(color => color.name === selectedColor);
    
    if (!selectedIconObj || !selectedColorObj) {
      return;
    }
    
    onAddCategory({
      category: name,
      spent: parseFloat(spent),
      limit: parseFloat(limit),
      color: selectedColorObj.value,
      icon: selectedIconObj.icon,
    });
    
    // Reset form
    setName('');
    setSpent('0');
    setLimit('0');
    setSelectedIcon('');
    setSelectedColor('');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Budget Category</DialogTitle>
          <DialogDescription>
            Create a custom budget category to track your spending.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g. Subscriptions"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spent">Current Spent (£)</Label>
                <Input
                  id="spent"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={spent}
                  onChange={(e) => setSpent(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit">Budget Limit (£)</Label>
                <Input
                  id="limit"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center gap-2">
                          {icon.icon}
                          <span>{icon.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.name} value={color.name}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${color.value.split(' ')[0]}`}></div>
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
