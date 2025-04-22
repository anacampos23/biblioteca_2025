<?php


return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'floors' => 'Pisos',
            'zones' => 'Zonas',
            'bookcases' => 'Estanterías',
            'books' => 'Libros',
            'loans'=> 'Préstamos',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
        ],
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona tu perfil y configuración de cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración del perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualiza tu nombre y dirección de correo electrónico',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Dirección de correo',
            'email_placeholder' => 'Dirección de correo',
            'unverified_email' => 'Tu dirección de correo no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualiza la configuración de apariencia de tu cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambia tu idioma preferido',
        ],
    ],
    'validation' => [
            'required' => 'El campo :attribute es obligatorio.',
            'email' => 'El campo :attribute debe ser una dirección de correo válida.',
            'email_not_exist'=> 'El email no se encuentra en la base de datos.',
            'ISBN_not_available'=> 'Este ISBN no está disponible.',
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
            'must_be_numeric' => 'El campo :attribute debe ser numérico.',
            'floor' => 'El piso debe estar entre 0 y 20.',
            'zone_floor' => 'Ya existe esa zona en este piso.',
            'capacity_zones'=> 'La capacidad del piso debe ser un número positivo',
            'zone_overload'=> 'El piso está lleno, ya no caben más zonas.'
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters'=> [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
        ],
        'delete_dialog' => [
            'success' => 'Eliminado correctamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'No hay resultados',
    ],
    'users' => [
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'description' => 'Gestiona los usuarios del sistema',
        'edit' => 'Editar Usuario',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'permisos' => [
            'Users' => [
                'users' => [
                    'view' => 'Ver usuarios',
                    'create' => 'Crear usuarios',
                    'edit' => 'Editar usuarios',
                    'delete' => 'Eliminar usuarios'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'Ver productos',
                    'create' => 'Crear productos',
                    'edit' => 'Editar productos',
                    'delete' => 'Eliminar productos'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'Ver reportes',
                    'export' => 'Exportar reportes',
                    'print' => 'Imprimir reportes'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Acceso a configuración',
                    'modify' => 'Modificar configuración'
                ],

            ],
        ],
        'roles' => [
            'default' => 'Selecciona un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del usuario',
            'email' => 'Email del usuario',
        ],
        'placeholders' => [
            'name' => 'Nombre del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingresa la información para crear un nuevo usuario en el sistema'
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'floors' => [
            'title' => 'Pisos',
            'title_sing' => 'Piso :number',
            'description' => 'Gestiona los pisos del edificio',
            'buttons' => [
                'new' => 'Nuevo Piso',
                'edit' => 'Editar',
                'save' => 'Guardar',
                'update' => 'Actualizar',
                'cancel' => 'Cancelar',
                'delete' => 'Eliminar',
                'deleting' => 'Eliminando...',
                'saving' => 'Guardando...',
                'retry' => 'Reintentar',
            ],
            'delete' => [
                'title' => '¿Estás seguro?',
                'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            ],
            'filters' => [
                'search' => 'Buscar',
                'floor_number' => 'Número del piso',
                'capacity_zones' => 'Capacidad de zonas',
            ],
            'placeholders' => [
                'floor_number' => 'Piso número...',
                'search' => 'Buscar pisos...',
                'capacity_zones' => 'Capacidad de zonas...'
            ],
            'cards' => [
                'title' => 'Crear Nuevo Piso',
                'description' => 'Ingresa la información para crear un nuevo piso en el sistema'
            ],
            'fields' => [
                'floor_number' => 'Piso número:',
                'floor' => 'piso',
                'capacity_zones' => [
                    'name'=> 'capacidad de zonas',
                    'title'=> 'Capacidad de zonas',
                ]
            ],
            'columns' => [
                'floor_number' =>'Piso número:',
                'capacity_zones' => 'Capacidad de zonas',
                'actions' => 'Acciones',
                'floor'=> 'Piso',
            ],
            'edit' =>[
                'name' => 'Editar piso',
                'description' => 'Ingresa la información para editar el piso.'
            ]
        ],
    'zones'=>[
            'title' => 'Zonas',
            'description' => 'Gestiona las zonas',
            'columns' => [
                'name' =>'Zona',
                'floor' => 'Piso nº',
                'actions' => 'Acciones',
                'floor_number'=> 'Piso',
            ],
            'list'=> [
                'Literature'=>'Literatura',
                'Novel'=> 'Novela',
                'Science and Technology'=> 'Ciencia y Tecnología',
                'Humanities'=> 'Humanidades',
                'Art'=> 'Arte',
                'Lifestyle'=> 'Estilo de vida',
                'Children'=> 'Infantil',
                'Young Adult'=> 'Juvenil',
            ],
            'buttons' => [
                'new' => 'Nueva zona',
                'edit' => 'Editar',
                'save' => 'Guardar',
                'update' => 'Actualizar',
                'cancel' => 'Cancelar',
                'delete' => 'Eliminar',
                'deleting' => 'Eliminando...',
                'saving' => 'Guardando...',
                'retry' => 'Reintentar',
            ],
            'filters' => [
                'search' => 'Buscar',
                'name' => 'Zona',
                'floor' => 'Piso',
            ],
            'placeholders' => [
               'name' => 'Nombre de la zona',
                'floor' => 'Número del piso',
                'selectFloor' => 'Selecciona el piso en el que está',
                'selectZone'=> 'Selecciona el nombre de la zona',
            ],
            'edit' =>[
                'name' => 'Editar zona',
                'description' => 'Ingresa la información para editar la zona.'
            ],
            'fields' => [
                'title' => 'Zona:',
                'name' => 'zona',
                'floor_title' => 'Piso:',
                'floor_name' => 'piso',
                'description' => [
                    'name'=> 'descripción...',
                    'title'=> 'Descripción:',
                ]
            ],
            'cards' => [
                'title' => 'Crear Nueva Zona',
                'description' => 'Ingresa la información para crear un nueva zona en el sistema'
            ],
            'delete' => [
                'title' => '¿Estás seguro?',
                'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la zona del sistema.',
            ],
            'delete_dialog' => [
                'title' => '¿Estás seguro?',
                'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la zona del sistema.',
                'success' => 'Eliminada correctamente ;)',
            ],
            'deleted_error' => 'Error al eliminar la zona',
            'no_results' => 'No hay resultados.',
            'error_loading' => 'Error al cargar las zonas. Por favor, inténtalo de nuevo.',
            'showing_results' => 'Mostrando :from a :to de :total resultados',
            'pagination' => [
                'previous' => 'Anterior',
                'next' => 'Siguiente',
            ],
        ],

        'bookcases'=> [
            'title' => 'Estanterías',
            'description' => 'Gestiona las estanterías',
            'columns' => [
                'name' =>'Estantería',
                'zone' => 'Zona',
                'floor' => 'Piso nº',
                'actions' => 'Acciones',
            ],
        ],
        'bookcases'=> [
            'title' => 'Estanterías',
            'description' => 'Gestiona los libros',
            'columns' => [
                'name' =>'Libro',
                'title' => 'Título',
                'author' => 'Autor',
                'genre'=> 'Géneros',
                'ISBN'=> 'ISBN',
                'editorial'=> 'Editorial',
                'quantity'=> 'Cantidad',
                'status'=> 'Estado',
                'bookcase'=> 'Estantería',
                'zone' => 'Zona',
                'floor' => 'Piso nº',
                'actions' => 'Acciones',
            ],
        ],
        'books'=>[
            'title' => 'Libros',
            'title_sing' => 'Libro :number',
            'description' => 'Gestiona los libros',
            'book'=> 'Libro',
            'filters' => [
                'title' => 'Título',
                'author' => 'Autor',
                'genre' => 'Género',
                'ISBN' => 'ISBN',
                'editorial' => 'Editorial',
                'quantity' => 'Unidades',
                'status' => 'Estado',
                'bookcase_name' => 'Estantería',
                'name' => 'Zona',
                'floor_number' => 'Piso',
                'available' => 'Disponible',
                'not_available' => 'No disponible'
            ],
            'placeholders' => [
                'title' => 'Título...',
                'author' => 'Autor...',
                'genre' => 'Género...',
                'ISBN' => 'ISBN...',
                'editorial' => 'Editorial...',
                'quantity' => 'Unidades...',
                'status' => 'Estado...',
                'bookcase_name' => 'Estantería...',
                'name' => 'Zona...',
                'floor_number' => 'Piso...',
            ],
            'buttons' => [
                'new' => 'Nuevo Libro',
                'edit' => 'Editar',
                'save' => 'Guardar',
                'update' => 'Actualizar',
                'cancel' => 'Cancelar',
                'delete' => 'Eliminar',
                'deleting' => 'Eliminando...',
                'saving' => 'Guardando...',
                'retry' => 'Reintentar',
            ],
            'columns' => [
                'title' => 'Título',
                'author' => 'Autor',
                'genre' => 'Género',
                'ISBN' => 'ISBN',
                'editorial' => 'Editorial',
                'quantity' => 'Unidades',
                'status' => 'Estado',
                'bookcase_name' => 'Estantería',
                'name' => 'Zona',
                'floor_number' => 'Piso',
                'actions' => 'Acciones',
                'isbn_loan_count' => 'Ejemplares prestados',
                'borrow'=> 'Tomar prestado'
            ],
            'show'=> [
                'title' => 'Título',
                'author' => 'Autor',
                'genre' => 'Género',
                'ISBN' => 'ISBN',
                'editorial' => 'Editorial',
                'quantity' => 'Unidades',
                'status' => 'Estado',
                'bookcase_name' => 'Estantería',
                'name' => 'Zona',
                'floor_number' => 'Piso',
                'location'=> 'Localización:',
            ],
            'zones' => [
                'Literature'=> 'Literatura',
                'Novel'=> 'Novela',
                'Science and Technology'=> 'Ciencia y Tecnología',
                'Humanities'=> 'Humanidades',
                'Art'=> 'Arte',
                'Lifestyle'=> 'Estilo de vida',
                'Children'=> 'Infantil',
                'Young Adult'=> 'Juvenil',
            ],
            'genres'=> [
                'Poetry'=> 'Poesía',
                'Theater'=> 'Teatro',
                'Essay'=> 'Ensayo',
                'Short Story'=> 'Cuento Corto',
                'Classics'=> 'Clásicos',
                'Historical Novel'=> 'Novela Histórica',
                'Crime Novel'=> 'Novela Negra',
                'Science Fiction Novel'=> 'Novela de Ciencia Ficción',
                'Romantic Novel'=> 'Novela Romántica',
                'Mathematics'=> 'Matemáticas',
                'Physics'=> 'Física',
                'Biology'=> 'Biología',
                'Computer Science'=> 'Informática',
                'Philosophy'=> 'Filosofía',
                'Psychology'=> 'Psicología',
                'Sociology'=> 'Sociología',
                'History'=> 'Historia',
                'Politics'=> 'Política',
                'Painting'=> 'Pintura',
                'Photography'=> 'Fotografía',
                'Architecture'=> 'Arquitectura',
                'Music'=> 'Música',
                'Cinema'=> 'Cine',
                'Health and Wellness'=> 'Salud y Bienestar',
                'Nutrition'=> 'Nutrición',
                'Sport'=> 'Deporte',
                'Travel'=> 'Viajes',
                'Children\'s Stories'=> 'Cuentos Infantiles',
                'Illustrated Books'=> 'Libros Ilustrados',
                'Educational Books'=> 'Libros Educativos',
                'Young Adult Novel'=> 'Novela Juvenil',
                'Young Adult Fantasy'=> 'Fantasía Juvenil',
                'Young Adult Thriller'=> 'Suspenso Juvenil',
            ],

        ],
        'loans'=> [
            'title' => 'Préstamos',
            'description' => 'Gestiona los préstamos',
            'active'=> 'Ver préstamos activos',
            'ISBN_list'=> ':ISBN',
            'card'=>[
                 'create'=> 'Realizar un préstamo:',
                 'new'=> 'Nuevo préstamo',
            ],
            'filters' => [
                'title' => 'Títlo',
                'author' => 'Autor',
                'ISBN' => 'ISBN',
                'name' => 'Nombre de usuario',
                'start_loan' => 'Inicio del préstamo',
                'end_loan' => 'Final del préstamo',
                'days_overdue' => 'Días de retraso',
                'active' => 'Estado del préstamo',
                'active_status' => 'En progreso',
                'inactive_status' => 'Inactivo'
            ],
            'placeholders' => [
                 'title' => 'Título...',
                 'author' => 'Autor...',
                 'ISBN' => 'ISBN...',
                 'start_loan' => 'Fecha de inicio del préstamo',
                    'end_loan' => 'Fecha final del préstamo',
                    'days_overdue' => 'Días de retraso...',
                    'active' => 'Préstamo en progreso/inactivo...',
                    'selectISBN'=> 'Selecciona el ISBN del libro',
             ],
             'buttons' => [
                'new' => 'Nuevo Préstamo',
                'edit' => 'Editar',
                'save' => 'Guardar',
                'update' => 'Actualizar',
                'cancel' => 'Cancelar',
                'delete' => 'Eliminar',
                'deleting' => 'Eliminando...',
                'saving' => 'Guardando...',
                'retry' => 'Reintentar',
                'return' => 'Devolver el libro',
                'renew' => 'Alargar el préstamo',
            ],
            'columns' => [
                'title' => 'Títlo',
                'author' => 'Autor',
                'ISBN' => 'ISBN',
                'name' => 'Nombre de usuario',
                'start_loan' => 'Inicio del préstamo',
                'end_loan' => 'Devuelto',
                'due_date' =>'Vencimiento del préstamo',
                'days_overdue' => 'Días de retraso',
                'active' => 'Estado del préstamo',
                'email'=>'Email del usuario',
                'delete' => 'Eliminar',
                'edit'=> 'Editar préstamo',
            ],
            'fields'=> [
            'ISBN' => 'ISBN',
            'not_returned' => 'No devuelto',
            'returned' => 'Devuelto el: ',
        ],
    ],

    'reserves'=>[
        'title' => 'Reservas',
        'description' => 'Gestiona las reservas',
        'card'=>[
            'create'=> 'Reserva el libro',
            'new'=> 'Nueva reserva',
        ],
        'filters' => [
            'title' => 'Títlo',
            'author' => 'Autor',
            'ISBN' => 'ISBN',
            'name' => 'Nombre de usuario',
        ],
        'placeholders' => [
            'title' => 'Título...',
            'author' => 'Autor...',
            'ISBN' => 'ISBN...',
         ],
         'buttons' => [
            'new' => 'Nueva Reserva',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'columns' => [
            'title' => 'Títlo',
            'author' => 'Autor',
            'ISBN' => 'ISBN',
            'name' => 'Nombre de usuario',
            'email'=>'Email del usuario',
            'delete' => 'Eliminar',
            'edit'=> 'Editar préstamo',
        ],
        'fields'=> [
            'ISBN' => 'ISBN',
        ],
    ]
];
