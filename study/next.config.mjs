/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**/*",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        pathname: "/breeds/*/*",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/codecamp-file-storage/*/*/*/*"
      }
      // {
      //   protocol: "https",
      //   hostname: "raw.githubusercontent.com",
      //   pathname: "/PokeAPI/sprites/master/sprites/pokemon/**/*"
      // }
    ]
  }
};

///PokeAPI/sprites/master/sprites/pokemon/shiny/1.png
//https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg
export default nextConfig;
