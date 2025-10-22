import { toast } from "react-toastify";

export const ToastSuccess = (msg, description) => {
  toast.success(
    <div className='font-semibold'>
      <div className='flex gap-3 mb-1'>
        <span className='font-bricolage-grotesque font-semibold text-green-600 text-lg leading-6'>{msg}</span>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};

export const ToastFailed = (msg, error) => {
  toast.error(
    <div className='font-semibold'>
      <div className='flex gap-3 mb-1'>
        <span className='font-bricolage-grotesque font-semibold text-red-600 text-lg leading-6'>{msg}</span>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};