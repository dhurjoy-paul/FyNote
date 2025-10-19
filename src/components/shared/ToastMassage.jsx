import { toast } from "react-toastify";

export const ToastSuccess = (msg) => {
  toast.success(
    <span className='font-bricolage-grotesque font-semibold text-green-600 text-lg leading-6'>{msg}</span>
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