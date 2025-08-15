import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  department: string;
  itemCode: string;
  partName: string;
  description: string;
  unitPrice: string;
  dateAcquired: string;
  serialNumber: string;
  supplier: string;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  formData: FormData;
  updateFormField: (field: string, value: string) => void;
  departments: string[];
}

export const FormModal: React.FC<FormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title,
  formData,
  updateFormField,
  departments
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-gray-600 font-medium">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label htmlFor="department" className="text-sm font-medium">SELECT DEPARTMENT</Label>
          <Select value={formData.department} onValueChange={(value) => updateFormField('department', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Cashier" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="itemCode" className="text-sm font-medium">SELECT ITEM CODE</Label>
          <Select value={formData.itemCode} onValueChange={(value) => updateFormField('itemCode', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="ConnecticutF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ConnecticutF">ConnecticutF</SelectItem>
              <SelectItem value="MassachusettsG">MassachusettsG</SelectItem>
              <SelectItem value="NewYorkH">NewYorkH</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="partName" className="text-sm font-medium">PART NAME</Label>
            <Input
              id="partName"
              value={formData.partName}
              onChange={(e) => updateFormField('partName', e.target.value)}
              placeholder="Ex. Ryzen 5 5600X"
              className="mt-1"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="dateAcquired" className="text-sm font-medium">DATE ACQUIRED</Label>
            <Input
              id="dateAcquired"
              type="date"
              value={formData.dateAcquired}
              onChange={(e) => updateFormField('dateAcquired', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="serialNumber" className="text-sm font-medium">SERIAL NUMBER</Label>
            <Input
              id="serialNumber"
              value={formData.serialNumber}
              onChange={(e) => updateFormField('serialNumber', e.target.value)}
              placeholder="Ex. RY-AMD-5600X"
              className="mt-1"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="unitPrice" className="text-sm font-medium">UNIT PRICE</Label>
            <Input
              id="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={(e) => updateFormField('unitPrice', e.target.value)}
              placeholder="Ex. 6500"
              className="mt-1"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="description" className="text-sm font-medium">DESCRIPTION</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => updateFormField('description', e.target.value)}
              placeholder="Ex. Desktop Processor"
              className="mt-1"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="supplier" className="text-sm font-medium">SUPPLIER</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => updateFormField('supplier', e.target.value)}
              placeholder="Ex. PCWorld"
              className="mt-1"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            CANCEL
          </Button>
          <Button onClick={onSubmit} className="bg-primary text-white hover:bg-primary/90">
            CONFIRM
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);