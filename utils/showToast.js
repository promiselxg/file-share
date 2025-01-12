const { toast } = require("@/hooks/use-toast");

export const showToast = ({ title, description, variant, className }) => {
  toast({
    ...(title && { title }),
    ...(description && { description }),
    ...(variant && { variant }),
    ...(className && { className }),
  });
};
