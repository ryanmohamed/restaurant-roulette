export default function ErrorElement ({ message }: { message: string}) {
    return (
        <main className="page bg-stone-100 centered p-10">
            <h1 className="text-center text-stone-950">{message}</h1>
        </main>
    );
}