import { getUserTodoListAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import TodosTable from "@/components/TodoTable";
// import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const { userId } = auth();
    console.log(userId);
    if (!userId) {
        // return <RedirectToSignIn redirectUrl={"/sign-in"}/>;
        redirect("/sign-in");
    }
    const todos = await getUserTodoListAction({ userId });
    console.log(todos);
    return (
        <main className="mx-auto flex flex-col w-full lg:w-3/4 justify-center space-y-4 mt-10">
            <AddTodoForm userId={userId} />
            <TodosTable todos={todos ? todos : []} /> 
        </main>
    );
}
