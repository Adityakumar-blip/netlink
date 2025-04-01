import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import useApiStore from "@/store/apiStore";
import { apiEndpoints } from "@/services/apiConfig";

// Comprehensive form validation schema
const formSchema = z.object({
  title: z.string().min(2, "Offer name must be at least 2 characters"),
  code: z
    .string()
    .min(4, "Code must be at least 4 characters")
    .max(20, "Code cannot exceed 20 characters")
    .regex(/^[A-Z0-9]+$/, "Code must be uppercase alphanumeric"),
  discountType: z.enum(["percentage", "fixed"], {
    required_error: "Please select a discount type",
  }),
  discountValue: z.coerce
    .number()
    .min(0, "Discount value must be positive")
    .max(100, "Discount cannot exceed 100"),
  expirationDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate > today;
    },
    { message: "Expiration date must be in the future" }
  ),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status",
  }),
  description: z.string().optional(),
  minPurchaseAmount: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddOfferFormProps {
  onClose: () => void;
  onSuccess?: (values: FormValues) => void;
  initialData?: Partial<FormValues> & { _id?: string };
  mode?: string;
}

const AddOfferForm: React.FC<AddOfferFormProps> = ({
  onClose,
  onSuccess,
  initialData,
  mode,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { postApiData, updateApi } = useApiStore();

  // Prepare default values with initial data or empty values
  const defaultValues: FormValues = {
    title: initialData?.title || "",
    code: initialData?.code || "",
    discountType: initialData?.discountType || "percentage",
    discountValue: initialData?.discountValue || 0,
    expirationDate: initialData?.expirationDate
      ? new Date(initialData.expirationDate).toISOString().split("T")[0]
      : "",
    status: initialData?.status || "active",
    description: initialData?.description || "",
    minPurchaseAmount: initialData?.minPurchaseAmount || undefined,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Determine endpoint based on mode
      const endpoint =
        mode === "add"
          ? apiEndpoints.offer.createOffer
          : apiEndpoints.offer.updateOffer;

      // Prepare submission data
      const submitData =
        mode === "edit" ? { ...values, _id: initialData?._id } : values;

      // API call
      const response =
        mode === "edit"
          ? await updateApi("offer", endpoint, submitData)
          : await postApiData("offer", endpoint, submitData);

      console.log("response", response);

      // Success toast
      toast({
        title: mode === "add" ? "Offer Created" : "Offer Updated",
        description: `${values.title} has been ${
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
      // Error handling
      console.error(`Error ${mode} offer:`, error);
      toast({
        title: "Offer Submission Failed",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if fields should be disabled
  const isReadOnly = mode === "view";

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Offer Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Summer Mega Sale"
                    {...field}
                    disabled={isReadOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Coupon Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SUMMER2024"
                    {...field}
                    disabled={isReadOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isReadOnly}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10"
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Optional Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Offer details"
                    {...field}
                    disabled={isReadOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiration and Status */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={isReadOnly} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isReadOnly}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Optional Minimum Purchase Amount */}
          <FormField
            control={form.control}
            name="minPurchaseAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Purchase Amount (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    disabled={isReadOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>

            {!isReadOnly && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {mode === "add" ? "Create Offer" : "Update Offer"}
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

export default AddOfferForm;
