interface FormHeaderProps {
  title: string;
}

export function FormHeader({ title }: FormHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black">ثبت {title}</h2>

      <p className="mt-2 text-sm text-gray-500">
        اطلاعات {title} را وارد کنید.
      </p>
    </div>
  );
}
