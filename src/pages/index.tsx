import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
	const hello = trpc.useQuery(["example.hello", { text: "from Clocky" }]);
	const session = useSession();

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

			<div className="bg-slate-600 flex justify-center h-screen w-screen items-center">
				<div className="py-6  text-slate-50">
					{hello.data ? (
						<h1 className="text-4xl">{hello.data.greeting}</h1>
					) : (
						<p>Loading..</p>
					)}
					<h2 className="text-2xl text-center">Comming Soon...</h2>
				</div>
			</div>

			{session ? (
				<div>
					<p className="text-center">
						{" "}
						You are logged in as {JSON.stringify(session?.data)}
					</p>
					<button onClick={() => signOut()}>Sign out</button>
				</div>
			) : (
				<button onClick={() => signIn()}>Sign in</button>
			)}
		</>
	);
};

export default Home;
