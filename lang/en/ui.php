<?php

return [
    'navigation' => [
        'menu' => 'Navigation Menu',
        'items' => [
            'dashboard' => 'Dashboard',
            'users' => 'Users',
            'floors' => 'Floors',
            'zones' => 'Zones',
            'bookcases' => 'Bookcases',
            'books' => 'Books',
            'repository' => 'Repository',
            'documentation' => 'Documentation',
        ],
    ],
    'user_menu' => [
        'settings' => 'Settings',
        'logout' => 'Log out',
    ],
    'auth' => [
        'failed' => 'These credentials do not match our records.',
        'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    ],
    'settings' => [
        'title' => 'Settings',
        'description' => 'Manage your profile and account settings',
        'navigation' => [
            'profile' => 'Profile',
            'password' => 'Password',
            'appearance' => 'Appearance',
            'languages' => 'Languages',
        ],
        'profile' => [
            'title' => 'Profile settings',
            'information_title' => 'Profile information',
            'information_description' => 'Update your name and email address',
            'name_label' => 'Name',
            'name_placeholder' => 'Full name',
            'email_label' => 'Email address',
            'email_placeholder' => 'Email address',
            'unverified_email' => 'Your email address is unverified.',
            'resend_verification' => 'Click here to resend the verification email.',
            'verification_sent' => 'A new verification link has been sent to your email address.',
            'save_button' => 'Save',
            'saved_message' => 'Saved',
        ],
        'password' => [
            'title' => 'Password settings',
            'update_title' => 'Update password',
            'update_description' => 'Ensure your account is using a long, random password to stay secure',
            'current_password_label' => 'Current password',
            'current_password_placeholder' => 'Current password',
            'new_password_label' => 'New password',
            'new_password_placeholder' => 'New password',
            'confirm_password_label' => 'Confirm password',
            'confirm_password_placeholder' => 'Confirm password',
            'save_button' => 'Save password',
            'saved_message' => 'Saved',
        ],
        'appearance' => [
            'title' => 'Appearance settings',
            'description' => 'Update your account\'s appearance settings',
            'modes' => [
                'light' => 'Light',
                'dark' => 'Dark',
                'system' => 'System'
            ]
        ],
        'languages' => [
            'title' => 'Language settings',
            'description' => 'Change your preferred language',
        ],
    ],
    'validation' => [
           'required' => 'The :attribute field is required.',
            'email' => 'The :attribute field must be a valid email address.',
            'min' => [
                'string' => 'The :attribute field must be at least :min characters.',
            ],
            'max' => [
                'string' => 'The :attribute field must not be greater than :max characters.',
            ],
            'unique' => 'The :attribute has already been taken.',
            'confirmed' => 'The :attribute confirmation does not match.',
            'must_be_numeric' => 'The :attribute must be numeric.',
            'floor' => 'The floor shoul be from 0 to 20.',
            'zone_floor' => 'The zone already exists in this floor.',
            'capacity_zones' => 'The floor capacity should be a positive number',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'close' => 'Close',
        ],
        'filters'=> [
            'title' => 'Filters',
            'clear' => 'Clear',
        ],
        'delete_dialog' => [
            'success' => 'Deleted successfully',
        ],
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
            'first' => 'First',
            'last' => 'Last',
        ],
        'per_page' => 'Per page',
        'no_results' => 'No results',
    ],
    'users' => [
        'title' => 'Users',
        'description' => 'Manage the system users',
        'create' => 'Create User',
        'edit' => 'Edit User',
        'fields' => [
            'name' => 'Name',
            'email' => 'Email',
            'password' => 'Password',
            'password_optional' => 'Password (optional)',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'rolPpal' => 'Main Role',
            'permisos' => 'Specific Permissions'
        ],
        'columns' => [
            'name' => 'Name',
            'email' => 'Email',
            'created_at' => 'Created at',
            'actions' => 'Actions',
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
                    'view' => 'View users',
                    'create' => 'Create users',
                    'edit' => 'Edit users',
                    'delete' => 'Delete users'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'View products',
                    'create' => 'Create products',
                    'edit' => 'Edit products',
                    'delete' => 'Delete products'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'View reports',
                    'export' => 'Export reports',
                    'print' => 'Print reports'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Access configuration',
                    'modify' => 'Modify configuration'
                ],

            ],
        ],
        'gridelements' => [
            'users' => 'Users',
            'products' => 'Products',
            'reports' => 'Reports',
            'configurations' => 'Configuration',

        ],
        'roles' => [
            'default' => 'Select a Role',
            'admin' => 'Administrator',
            'advanced' => 'Advanced User',
            'usuario' => 'Basic User'
        ],
        'filters' => [
            'search' => 'Search',
            'name' => 'User name',
            'email' => 'User email',
        ],
        'placeholders' => [
            'name' => 'Complete user name',
            'email' => 'email@example.com',
            'password' => 'Secure user password',
            'search' => 'Search users...',
            'passRulings' => 'The password must be at least 8 characters long, including nubers and letters'
        ],
        'tabs' => [
            'userForm' => 'Basic Information',
            'permissionsForm' => 'Roles and Permissions'
        ],
        'cards' => [
            'title' => 'Create New User',
            'description' => 'Input the information to create a new user in the system.'
        ],
        'buttons' => [
            'new' => 'New User',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
            'success' => 'Successfully deleted ;)',
        ],
        'deleted_error' => 'Error deleting user',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading users. Please try again.',
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
        ],
    ],
    'floors' => [
            'title' => 'Floors',
            'title_sing' => 'Floor :number',
            'description' => 'Manage the building floors',
            'buttons' => [
                'new' => 'New Floor',
                'edit' => 'Edit',
                'save' => 'Save',
                'update' => 'Update',
                'cancel' => 'Cancel',
                'delete' => 'Delete',
                'deleting' => 'Deleting...',
                'saving' => 'Saving...',
                'retry' => 'Retry',
            ],
            'delete' => [
                'title' => 'Are you sure?',
                'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
            ],
            'filters' => [
                'search' => 'Search',
                'floor_number' => 'Floor number',
                'capacity_zones' => "Zone's capacity",
            ],
            'placeholders' => [
                'floor_number' => 'Floor No. ...',
                'capacity_zones' => "Zone's capacity...",
            ],
            'cards' => [
                'title' => 'Create New Floor',
                'description' => 'Input the information to create a new floor in the system.'
            ],
            'fields' => [
                'floor_number' =>'Floor No. :',
                'floor' => 'floor',
                'capacity_zones' => [
                    'name'=> 'zone capacity',
                    'title'=> 'Zone capacity',
                ]
            ],
            'columns' => [
                'floor_number' =>'Floor No. :',
                'capacity_zones' => 'Zone capacity',
                'actions' => 'Actions',
            ],
            'edit' =>[
                'name' => 'Edit Floor',
                'description' => 'Input the information to edit the floor.'
            ]
    ],

    'zones'=> [
        'title' => 'Zones',
        'description' => 'Manage the zones',
        'columns' => [
            'name' =>'Zone',
            'floor' => 'Floor No.',
            'actions' => 'Actions',
        ],
        'list'=> [
            'Literature'=>'Literature',
            'Novel'=> 'Novel',
            'Science and Technology'=> 'Science and Technology',
            'Humanities'=> 'Humanities',
            'Art'=> 'Art',
            'Lifestyle'=> 'Lifestyle',
            'Children'=> 'Children',
            'Young Adult'=> 'Young Adult',
        ],
        'buttons' => [
            'new' => 'New Zone',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'filters' => [
            'search' => 'Search',
            'name' => 'Zone',
            'floor' => "Floor",
        ],
        'placeholders' => [
            'name' => "Zone's name",
            'floor' => 'Floor number',
            'selectFloor' => "Select the floor",
            'selectZone'=> 'Select zone name',
        ],
        'edit' =>[
            'name' => 'Edit Zone',
            'description' => 'Input the information to edit the zone.'
        ],
        'fields' => [
            'title' =>'Zone:',
            'name' => 'zone',
            'floor_title' => 'Floor:',
            'floor_name' => 'floor',
            'description' => [
                'name'=> 'description...',
                'title'=> 'Description:',
            ]
        ],
        'cards' => [
            'title' => 'Create New Zone',
            'description' => 'Input the information to create a new zone in the system.'
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The zone will be permanently deleted from the system.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The zone will be permanently deleted from the system.',
            'success' => 'Successfully deleted ;)',
        ],
        'deleted_error' => 'Error deleting zone',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading zones. Please try again.',
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
        ],
    ],

    'bookcases'=> [
        'title' => 'Bookcases',
        'description' => 'Manage the bookcases',
        'columns' => [
            'name' =>'Bookcase',
            'zone' => 'Zone',
            'floor' => 'Floor No.',
            'actions' => 'Actions',
        ],
    ],
    'bookcases'=> [
        'title' => 'Books',
        'description' => 'Manage the books',
        'columns' => [
            'name' =>'Book',
            'title' => 'Title',
            'genre'=> 'Genres',
            'ISBN'=> 'ISBN',
            'editorial'=> 'Editorial',
            'quantity'=> 'Quantity',
            'status'=> 'Status',
            'bookcase'=> 'Bookcase',
            'zone' => 'Zone',
            'floor' => 'Floor No.',
            'actions' => 'Actions',
        ],
    ],
    "books"=>[
        'title' => 'Books',
        'description' => 'Manage the books',
        'filters' => [
            'title' => 'Title',
            'author' => 'Author',
            'genre' => 'Genre',
            'ISBN' => 'ISBN',
            'editorial' => 'Editorial',
            'quantity' => 'Units',
            'status' => 'Status',
            'bookcase_name' => 'Bookcase',
            'name' => 'Zone',
            'floor_number' => 'Floor',
        ],
        'placeholders' => [
             'title' => 'Title...',
             'author' => 'Author...',
             'genre' => 'Genre...',
             'ISBN' => 'ISBN...',
             'editorial' => 'Editorial...',
             'quantity' => 'Units...',
             'status' => 'Status...',
             'bookcase_name' => 'Bookcase...',
             'name' => 'Zone...',
             'floor_number' => 'Floor...',
         ],
         'buttons' => [
            'new' => 'New Book',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'columns' => [
            'title' => 'Title',
            'author' => 'Author',
            'genre' => 'Genre',
            'ISBN' => 'ISBN',
            'editorial' => 'Editorial',
            'quantity' => 'Units',
            'status' => 'Status',
            'bookcase_name' => 'Bookcase',
            'name' => 'Zone',
            'floor_number' => 'Floor',
            'actions' => 'Actions',
        ],
    ]
];
