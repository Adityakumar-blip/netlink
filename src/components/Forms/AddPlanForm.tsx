import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import useApiStore from "@/store/apiStore";
import { apiEndpoints } from "@/services/apiConfig";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Plan name must be at least 2 characters"),
  price: z.object({
    monthly: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid monthly price"),
    annual: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid annual price"),
  }),
  maxTranscriptionMinutes: z
    .string()
    .regex(/^\d+$/, "Enter a valid number of minutes"),
  storageLimit: z.string().regex(/^\d+$/, "Enter a valid storage limit"),
  accuracyLevel: z.enum(["Standard", "High", "Premium"], {
    required_error: "Please select an accuracy level",
  }),
  speechLanguages: z.array(z.string()).optional(),
  multilanguageTranscription: z.boolean(),
  aiPoweredEditing: z.boolean(),
  exportFormats: z.array(z.string()).optional(),
  apiAccess: z.boolean(),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddPlanFormProps {
  onClose: () => void;
  onSuccess?: (values: FormValues) => void;
  initialData?: Partial<FormValues> & { _id?: string };
  mode?: string;
}

const AddPlanForm = ({
  onClose,
  onSuccess,
  mode = "add",
  initialData,
}: AddPlanFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { postApiData, updateApi } = useApiStore();

  // Prepare default values with initial data or empty values
  const defaultValues: FormValues = {
    name: initialData?.name || "",
    price: {
      monthly: initialData?.price?.monthly || "0",
      annual: initialData?.price?.annual || "0",
    },
    maxTranscriptionMinutes: initialData?.maxTranscriptionMinutes || "30",
    storageLimit: initialData?.storageLimit || "100",
    accuracyLevel: initialData?.accuracyLevel || "Standard",
    speechLanguages: initialData?.speechLanguages || [],
    multilanguageTranscription:
      initialData?.multilanguageTranscription || false,
    aiPoweredEditing: initialData?.aiPoweredEditing || false,
    exportFormats: initialData?.exportFormats || [],
    apiAccess: initialData?.apiAccess || false,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      // Reset the form with initialData values
      form.reset({
        name: initialData.name || "",
        price: {
          monthly: initialData.price?.monthly || "0",
          annual: initialData.price?.annual || "0",
        },
        maxTranscriptionMinutes: initialData.maxTranscriptionMinutes || "30",
        storageLimit: initialData.storageLimit || "100",
        accuracyLevel: initialData.accuracyLevel || "Standard",
        speechLanguages: initialData.speechLanguages || [],
        multilanguageTranscription:
          initialData.multilanguageTranscription || false,
        aiPoweredEditing: initialData.aiPoweredEditing || false,
        exportFormats: initialData.exportFormats || [],
        apiAccess: initialData.apiAccess || false,
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Determine endpoint based on mode
      const endpoint =
        mode === "add"
          ? apiEndpoints.plan.createPlan
          : apiEndpoints.plan.updatePlan;

      // Prepare submission data
      const submitData =
        mode === "edit" ? { ...values, _id: initialData?._id } : values;

      // API call
      const response =
        mode === "edit"
          ? await updateApi("plan", endpoint, submitData)
          : await postApiData("plan", endpoint, values);

      // Success toast
      toast({
        title: mode === "add" ? "Plan Created" : "Plan Updated",
        description: `${values.name} has been ${
          mode === "add" ? "created" : "updated"
        } successfully.`,
        variant: "default",
      });

      // Optional success callback
      if (onSuccess) {
        onSuccess(values);
      }

      // Close the form
      onClose();
    } catch (error) {
      console.error(`Error ${mode} plan:`, error);
      toast({
        title: "Error saving plan",
        description: "There was a problem saving the plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if fields should be disabled
  const isReadOnly = mode === "view";

  return (
    <div className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Free Tier"
                    {...field}
                    disabled={isReadOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price.monthly"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price.annual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="maxTranscriptionMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Transcription Minutes</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="30"
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage Limit (GB)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="accuracyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accuracy Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isReadOnly}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accuracy level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="multilanguageTranscription"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormLabel>Multilanguage Transcription</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiPoweredEditing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormLabel>AI Powered Editing</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="apiAccess"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isReadOnly}
                  />
                </FormControl>
                <FormLabel>API Access</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isReadOnly}
                  />
                </FormControl>
                <FormLabel>Active Plan</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            {!isReadOnly && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {mode === "add" ? "Add Plan" : "Update Plan"}
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddPlanForm;
