import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		PF_KEY: process.env.PF_KEY,
	},
};

export default nextConfig;
