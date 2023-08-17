import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full px-3 md:px-6 ">
      <h1 className="mt-[60px] w-full text-center ">Logo</h1>
      <main className="w-full text-center  text-lg font-extrabold mt-[75px] ">
        Please login to your account first!
      </main>
      <div className="justify-center w-full mt-12 flex">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
