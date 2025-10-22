import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const CustomInputField = ({
  label = 'Label',
  must = true,
  name = "name",
  type = "text",
  placeholder = "placeholder",
  Icon,
  hintText = "",
  register,         // From react-hook-form useForm()
  errors = {},      // From react-hook-form formState.errors
  validation = {},  // Validation rules object
  className,
  inputClassName,
  disabled = false,
  ...props
}) => {
  const fieldError = errors[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-base">
        {label} {must && <span className="text-destructive">*</span>}
      </Label>

      <InputGroup className="group">
        <InputGroupInput
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...(register ? register(name, validation) : {})}
          className={cn(fieldError && 'border-destructive', inputClassName)}
          {...props}
        />
        {Icon && (
          <InputGroupAddon>
            <Icon strokeWidth={3} className="group-focus-within:text-primary" />
          </InputGroupAddon>
        )}
      </InputGroup>

      {hintText && !fieldError && (
        <p className="text-muted-foreground text-sm">{hintText}</p>
      )}

      {fieldError && (
        <p className="text-destructive text-sm">{fieldError.message}</p>
      )}
    </div>
  );
};

export default CustomInputField;