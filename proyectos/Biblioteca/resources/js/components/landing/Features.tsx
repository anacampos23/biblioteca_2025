export default function Features() {
    return (
        <section id="features" className="py-20 dark:bg-gray-800/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Características Principales
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Nuestra plataforma ofrece todas las herramientas necesarias para una gestión eficiente de bibliotecas.
                    </p>
                </div>
                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                            <svg className="h-6 w-6 text-primary dark:text-primary-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-medium">Gestión de Libros</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Administra tu catálogo completo de libros, con información detallada, categorías, autores y ubicaciones.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                            <svg className="h-6 w-6 text-primary dark:text-primary-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 6.1H3" />
                                <path d="M21 12.1H3" />
                                <path d="M15.1 18H3" />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-medium">Préstamos y Devoluciones</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Sistema completo para gestionar préstamos, reservas, renovaciones y devoluciones con fechas y recordatorios.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                            <svg className="h-6 w-6 text-primary dark:text-primary-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-medium">Gestión de Usuarios</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Administra usuarios, membresías, permisos y mantén un historial completo de actividades.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                            <svg className="h-6 w-6 text-primary dark:text-primary-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M3 9h18" />
                                <path d="M9 21V9" />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-medium">Múltiples Sucursales</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Gestiona varias bibliotecas desde una única plataforma centralizada, con control de inventario por ubicación.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                            <svg className="h-6 w-6 text-primary dark:text-primary-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v8" />
                                <path d="m4.93 10.93 1.41 1.41" />
                                <path d="M2 18h2" />
                                <path d="M20 18h2" />
                                <path d="m19.07 10.93-1.41 1.41" />
                                <path d="M22 22H2" />
                                <path d="m16 6-4 4-4-4" />
                                <path d="M16 18a4 4 0 0 0-8 0" />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-medium">Estadísticas y Reportes</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Obtén informes detallados sobre préstamos, libros populares, actividad de usuarios y más.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                            <svg className="h-6 w-6 text-primary dark:text-primary-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-medium">Búsqueda Avanzada</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Sistema de búsqueda potente para encontrar libros por título, autor, género, ISBN y más.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
