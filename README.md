# Notes App Dibimbing

Notes App dengan fungsionalitas CRUD.

## Tech Stack

- **Next.js**: A popular React framework for building server-rendered and statically generated applications.
- **Prisma**: A modern database toolkit for Node.js and TypeScript, making database access and management more efficient and developer-friendly.
- **React Query**: A powerful data-fetching library that simplifies fetching, caching, and updating data in your React components.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces with minimal CSS code.
- **Chakra UI**

## Getting Started

Firstly you need this tech, that are required to run on local:

- Docker/Podman - Used for the database.
- node js (^16 is recomended).
- npm/yarn/pnpm/others (I will use pnpm for this guide).

Step to run on local (first time only):

1. Clone this repostiory `git clone https://github.com/rizkisiraj/notes-app-dibimbing`
2. Move into the directory `cd notes-app-dibimbing`
3. Install all the dependancy `npm install`
4. Move into the prisma directory `cd prisma`
5. Run the docker compose file `docker compose up`
6. populate the env variable `cp .env.example .env`
7. Run the Pisma migration `npm prisma db push`
8. Finaly the seeder `npm prisma db seed`

## Folder Structure

Next-Prisma-Starter follows a well-organized folder structure to keep your codebase clean and maintainable. Here's a brief overview:

- `src`: Contains the application's source code, including pages, components, Redux Toolkit setup, and React Query API endpoints.
- `prisma`: Contains Prisma-related files, including the database schema (`schema.prisma`) and migrations.
- `public`: Public assets such as images and fonts can be placed in this directory.
- `styles`: Styling files, including Tailwind CSS configurations and global styles.
- `pages`: Next.js pages for routing and rendering components.
- `api`: Custom API routes for server-side logic.

```bash
notes-app-dibimbing/
├── prisma/
├── public/
├── src/
│   ├── config/
│   ├── pages/
│   ├── redux/
│   │   ├── api/
│   │   ├── features/
│   ├── styles/
│   ├── types/
│   └── utils/
├── ...
├── package.json
├── tsconfig.json
├── ...

```

## Documentation

For more detailed documentation on how to use Next-Prisma-Starter and its features, refer to the [Wiki](https://github.com/ManishPJha/next-prisma-starter/wiki).

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed for your projects. Please refer to the [LICENSE](LICENSE) file for more information.

## Contributions

Contributions are welcome! If you have suggestions, bug reports, or want to contribute to this project, please open an issue or create a pull request.

Happy coding with Next-Prisma-Starter! 🚀
