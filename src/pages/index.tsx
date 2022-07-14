import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
	const hello = trpc.useQuery(["example.hello", { text: "from Clocky" }]);
	const getAll = trpc.useQuery(["example.getAll"]);
	const kiss = trpc.useQuery(["example.gimmeAKiss"]);
	const { data: session, status } = useSession();

	return (
		<>
			<Head>
				<title>ClockY</title>
				<meta
					name="description"
					content="Another try to build a wepapp ¯\\_(ツ)_/¯"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="bg-slate-600 grid grid-cols-1 content-center h-screen w-screen items-center text-center">
				<div className="py-6  text-slate-50">
					{hello.data ? (
						<h1 className="text-4xl">{hello.data.greeting}</h1>
					) : (
						<p>Loading..</p>
					)}
					<h2 className="text-2xl">Comming Soon...</h2>
				</div>
				<div className="py-6  text-slate-50">
					{getAll.data ? (
						<h2 className="text-2xl">
							Current Users: {getAll.data.length}
						</h2>
					) : (
						<p>Loading..</p>
					)}
				</div>
				{!!session ? (
					<div className="text-slate-50">
						<p className="underline decoration-slate-100 text-lg text-slate-50 hover:text-red-500 hover:decoration-red-500 hover:font-bold">
							You are logged in as {session.user?.email}
						</p>
						<button
							className="login-button my-4"
							onClick={() => signOut()}
						>
							Sign out
						</button>
					</div>
				) : (
					<div>
						<button
							className="login-button"
							onClick={() => signIn()}
						>
							Sign in
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
