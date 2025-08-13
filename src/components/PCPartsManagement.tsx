import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Upload, Download, Edit, Trash2, Menu, ChevronDown, Home, Ticket, User, Building, Archive, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface PCPart {
  id: string;
  department: string;
  itemCode: string;
  partName: string;
  description: string;
  unitPrice: number;
  ticketCount: number;
  dateAcquired: string;
  serialNumber: string;
  supplier: string;
}

const initialParts: PCPart[] = [
  {
    id: '1',
    department: 'Cashier',
    itemCode: 'ConnecticutF',
    partName: 'Ryzen 5 5600X',
    description: 'Desktop Processor',
    unitPrice: 6500,
    ticketCount: 1,
    dateAcquired: '2023-01-15',
    serialNumber: 'RY-AMD-5600X',
    supplier: 'PCWorld'
  }
];

const departments = ['Cashier', 'ConnecticutF', 'IT Support', 'Management'];
const categories = ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard'];

export default function PCPartsManagement() {
  const [parts, setParts] = useState<PCPart[]>(initialParts);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<PCPart | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    department: '',
    itemCode: '',
    partName: '',
    description: '',
    unitPrice: '',
    dateAcquired: '',
    serialNumber: '',
    supplier: ''
  });

  const handleAddPart = () => {
    if (!formData.department || !formData.itemCode || !formData.partName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newPart: PCPart = {
      id: Date.now().toString(),
      department: formData.department,
      itemCode: formData.itemCode,
      partName: formData.partName,
      description: formData.description,
      unitPrice: parseFloat(formData.unitPrice) || 0,
      ticketCount: 0,
      dateAcquired: formData.dateAcquired,
      serialNumber: formData.serialNumber,
      supplier: formData.supplier
    };

    setParts([...parts, newPart]);
    setIsAddModalOpen(false);
    setFormData({
      department: '',
      itemCode: '',
      partName: '',
      description: '',
      unitPrice: '',
      dateAcquired: '',
      serialNumber: '',
      supplier: ''
    });

    toast({
      title: "Success",
      description: "PC part added successfully"
    });
  };

  const handleEditPart = () => {
    if (!editingPart || !formData.department || !formData.itemCode || !formData.partName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedParts = parts.map(part => 
      part.id === editingPart.id ? {
        ...part,
        department: formData.department,
        itemCode: formData.itemCode,
        partName: formData.partName,
        description: formData.description,
        unitPrice: parseFloat(formData.unitPrice) || 0,
        dateAcquired: formData.dateAcquired,
        serialNumber: formData.serialNumber,
        supplier: formData.supplier
      } : part
    );

    setParts(updatedParts);
    setIsEditModalOpen(false);
    setEditingPart(null);
    
    toast({
      title: "Success",
      description: "PC part updated successfully"
    });
  };

  const openEditModal = (part: PCPart) => {
    setEditingPart(part);
    setFormData({
      department: part.department,
      itemCode: part.itemCode,
      partName: part.partName,
      description: part.description,
      unitPrice: part.unitPrice.toString(),
      dateAcquired: part.dateAcquired,
      serialNumber: part.serialNumber,
      supplier: part.supplier
    });
    setIsEditModalOpen(true);
  };

  const deletePart = (id: string) => {
    setParts(parts.filter(part => part.id !== id));
    toast({
      title: "Success",
      description: "PC part deleted successfully"
    });
  };

  const filteredParts = parts.filter(part => {
    const matchesDepartment = !selectedDepartment || selectedDepartment === 'all' || part.department === selectedDepartment;
    const matchesSearch = !searchTerm || 
      part.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const FormModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    title 
  }: { 
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: () => void; 
    title: string;
  }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gray-600 font-medium">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="department" className="text-sm font-medium">SELECT DEPARTMENT</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Cashier" />
                <ChevronDown className="h-4 w-4" />
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
            <Select value={formData.itemCode} onValueChange={(value) => setFormData({...formData, itemCode: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="ConnecticutF" />
                <ChevronDown className="h-4 w-4" />
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
                onChange={(e) => setFormData({...formData, partName: e.target.value})}
                placeholder="Ex. Ryzen 5 5600X"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dateAcquired" className="text-sm font-medium">DATE ACQUIRED</Label>
              <Input
                id="dateAcquired"
                type="date"
                value={formData.dateAcquired}
                onChange={(e) => setFormData({...formData, dateAcquired: e.target.value})}
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
                onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                placeholder="Ex. Ryzen 5 5600X"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="unitPrice" className="text-sm font-medium">UNIT PRICE</Label>
              <Input
                id="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                placeholder="Ex. 6500"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description" className="text-sm font-medium">DESCRIPTION</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ex. Desktop Processor"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="supplier" className="text-sm font-medium">SUPPLIER</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                placeholder="Ex. PCWorld"
                className="mt-1"
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

  const navigationItems = [
    { icon: Home, label: "HOME" },
    { icon: Ticket, label: "TICKET" },
    { icon: User, label: "USER" },
    { icon: Building, label: "DEPARTMENT" },
    { icon: Archive, label: "CATEGORY" },
    { icon: Archive, label: "SUB-CATEGORY" },
    { icon: Archive, label: "ASSET" },
    { icon: BarChart3, label: "REPORTS" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0">
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="bg-white h-full">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-700">Navigation</h2>
                  </div>
                  <div className="p-0">
                    {navigationItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-200">
                        <button className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                          <item.icon className="h-5 w-5 text-gray-600" />
                          <span className="text-gray-700 font-medium">{item.label}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-xl font-semibold text-primary">JATS</div>
          </div>
          <div className="text-sm text-gray-600">Asset Management</div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-72 bg-gray-100 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-4">PC PARTS</h2>
              <p className="text-gray-600 mb-6">MANAGEMENT</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">FILTER BY DEPARTMENT</Label>
              <p className="text-xs text-gray-500 mb-2">Select Department:</p>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="All Departments" />
                  <ChevronDown className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">FILTER BY CATEGORY:</Label>
              <p className="text-xs text-gray-500 mb-2">Select Category:</p>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="All Categories" />
                  <ChevronDown className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white border-2 border-primary rounded-lg p-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    ADD
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Upload className="h-4 w-4 mr-2" />
                BULK UPLOAD
              </Button>
              
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Download className="h-4 w-4 mr-2" />
                EXPORT
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">DEPARTMENT</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">ITEM CODE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PART NAME</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">DESCRIPTION</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">UNIT PRICE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">TICKET COUNT</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.map((part) => (
                    <tr key={part.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{part.department}</td>
                      <td className="py-3 px-4 text-sm">{part.itemCode}</td>
                      <td className="py-3 px-4 text-sm font-medium">{part.partName}</td>
                      <td className="py-3 px-4 text-sm">{part.description}</td>
                      <td className="py-3 px-4 text-sm">{part.unitPrice.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">{part.ticketCount}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditModal(part)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deletePart(part.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Download Template Button */}
            <div className="flex justify-end mt-6">
              <Button className="bg-primary text-white hover:bg-primary/90">
                <Download className="h-4 w-4 mr-2" />
                DOWNLOAD TEMPLATE
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPart}
        title="ADD PC PART"
      />

      {/* Edit Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditPart}
        title="EDIT PC PART"
      />
    </div>
  );
}