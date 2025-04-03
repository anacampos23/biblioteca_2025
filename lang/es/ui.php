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
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
            'must_be_numeric' => 'El campo :attribute debe ser numérico.',
            'capacity_zones' => 'La capacidad de un piso es de 0 a 20 zonas.',
            'zone_floor' => 'Ya existe esa zona en este piso.',
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
            'success' => 'Usuario eliminado correctamente',
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
            'name' => 'Nombre completo del usuario',
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
                'description' => 'Descripción',
            ],
            'placeholders' => [
               'name' => 'Nombre de la zona',
                'description' => 'Descripción',
                'selectFloor' => 'Selecciona el piso en el que está',
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
            'title' => 'Libros',
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
];
