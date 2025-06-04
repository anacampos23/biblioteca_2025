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
            'loans' => 'Loans',
            'reserves'=> 'Reservations',
            'repository' => 'Repository',
            'documentation' => 'Documentation',
            'reserves' => 'Reservations',
            'statistics' => 'Statistics',
            'booksearch' => 'Book Search',
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
        'statistics' => 'User statistics',
        'navigation' => [
            'profile' => 'Profile',
            'password' => 'Password',
            'appearance' => 'Appearance',
            'languages' => 'Languages',
            'all' => 'All settings'
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
            'loan' => 'Loan:',
            'reserve' => 'Reserve:',
            'active' => 'Current active loan',
            'all' => 'All records',
            'status' => [
                'title' => 'Status: ',
                'waiting' => '"Waiting"',
                'contacted' => '"Contacted"',
                'finished' => '"Finished"',
            ],
            'select_date' => 'Filter by date',
            'days_overdue' => 'Days overdue:',
            'days' => 'days',
            'loans' => 'Loans',
            'reserves' => 'Reservations'
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
        'email_not_exist' => 'The email is not in the data base',
        'ISBN_not_exist' => 'This ISBN does not exist.',
        'book_not_available' => 'This book is not available to be loaned.',
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
        'zone_overload' => 'There floor is full, there is not enough space.',
        'email_isbn_exists' => 'This user has already the book loaned',
        'email_isbn_reserved' => 'This user has already the book reserved',
        'ISBNlenght' => 'The ISBN value should has 13 characters',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'close' => 'Close',
        ],
        'filters' => [
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
        'timeline' => 'Timeline',
        'no_loans_reserves' => 'This user has no loans or reservations yet',
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
        'export'=> 'Export users',
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
            'floor_number' => 'Floor No. :',
            'floor' => 'floor',
            'capacity_zones' => [
                'name' => 'zone capacity',
                'title' => 'Zone capacity',
            ]
        ],
        'columns' => [
            'floor_number' => 'Floor No. :',
            'capacity_zones' => 'Zone capacity',
            'actions' => 'Actions',
            'floor' => 'Floor',
        ],
        'edit' => [
            'name' => 'Edit Floor',
            'description' => 'Input the information to edit the floor.'
        ],
        'export'=> 'Export floors',
    ],

    'zones' => [
        'title' => 'Zones',
        'description' => 'Manage the zones',
        'columns' => [
            'name' => 'Zone',
            'floor' => 'Floor No.',
            'actions' => 'Actions',
            'floor_number' => 'Floor',
        ],
        'list' => [
            'Literature' => 'Literature',
            'Novel' => 'Novel',
            'Science and Technology' => 'Science and Technology',
            'Humanities' => 'Humanities',
            'Art' => 'Art',
            'Lifestyle' => 'Lifestyle',
            'Children' => 'Children',
            'Young Adult' => 'Young Adult',
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
            'selectZone' => 'Select zone name',
        ],
        'edit' => [
            'name' => 'Edit Zone',
            'description' => 'Input the information to edit the zone.'
        ],
        'fields' => [
            'title' => 'Zone:',
            'name' => 'zone',
            'floor_title' => 'Floor:',
            'floor_name' => 'floor',
            'description' => [
                'name' => 'description...',
                'title' => 'Description:',
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
        'export'=> 'Export zones',
    ],

    'bookcases' => [
        'title' => 'Bookcases',
        'description' => 'Manage the bookcases',
        'columns' => [
            'name' => 'Bookcase',
            'zone' => 'Zone',
            'floor_number' => 'Floor No.',
            'actions' => 'Actions',
        ],
        'filters' => [
            'name' => 'Bookcase',
            'zone' => 'Zone',
            'floor' => 'Floor No.',
            'actions' => 'Actions',
        ],
        'placeholders' => [
            'name' => 'Bookcase No. ...',
            'zone' => 'Zone...',
            'floor' => 'Floor No. ...',
            'bookcase_number'=> 'Bookcase number...'
        ],
        'buttons' => [
            'new' => 'New Bookcase',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete'=> [
            'title'=> 'Delete bookcase',
            'description' => 'Are you sure you want to delete this bookcase?'
        ],
        'cards' => [
            'create' => [
                'title' => 'Create a new bookcase',
                'create' => 'Create Bookcase',
                'description' => 'Data from the new bookcase',
            ],
            'edit' => [
                'title' => 'Edit a bookcase',
                'edit' => 'Edit Bookcase',
                'description'=>'Modificate data from the bookcase',
            ]
        ],
        'fields'=> [
            'bookcase_number'=> 'Bookcase number'
        ],
        'same_name_error'=> 'There is already a bookcase with this number in this zone and floor',
        'export'=> 'Export bookcases',
    ],
    "books" => [
        'title' => 'Books',
        'description' => 'Manage the books',
        'book' => 'Book',
        'books' => 'Books',
        'create'=> 'Create book',
        'edit'=> 'Edit book',
        'searchBook' => 'Book Catalogue',
        'searchBook_description' => 'Quickly find any book in our catalogue',
        'cards'=>[
            'title'=> 'New book',
            'description' => 'Add information from the new book',
            'editTitle'=> 'Edit book',
            'editDescription'=> 'Edit the information from the book',
        ],
        'tabs' =>[
            'bookForm' => 'Book information',
            'locationForm' => 'Book ubication'
        ],
        'filters' => [
            'title' => 'Title',
            'author' => 'Author',
            'genre' => 'Genre',
            'ISBN' => 'ISBN',
            'editorial' => 'Editorial',
            'quantity' => 'Units',
            'availability' => 'Availability',
            'bookcase_name' => 'Bookcase',
            'name' => 'Zone',
            'floor_number' => 'Floor',
            'available' => 'Available',
            'not_available' => 'Not available',
            'reserve' => 'Reservation',
            'reserved' => 'Reserved',
            'not_reserved' => 'Not reserved',
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'genre' => 'Genre...',
            'ISBN' => 'ISBN...',
            'editorial' => 'Editorial...',
            'quantity' => 'Units...',
            'available' => 'Available/Not available',
            'bookcase_name' => 'Bookcase...',
            'name' => 'Zone...',
            'floor_number' => 'Floor...',
            'reserved' => 'Reserved/Not reserved',
            'selectGenre' => 'Select genres'
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
            'reserve' => 'Reserve book',
            'QR'=> 'QR Code Reader',
            'QR_create'=> 'Create book QR code',
        ],
        'columns' => [
            'title' => 'Title',
            'author' => 'Author',
            'genre' => 'Genre',
            'ISBN' => 'ISBN',
            'editorial' => 'Editorial',
            'quantity' => 'Units',
            'available' => 'Availability',
            'bookcase_name' => 'Bookcase',
            'name' => 'Zone',
            'floor_number' => 'Floor',
            'actions' => 'Actions',
            'isbn_loan_count' => 'Borrowed copies',
            'borrow' => 'Make loan',
            'created_at' => 'Created at',
        ],
        'show' => [
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
            'location' => 'Location:',
        ],
        'zones' => [
            'Literature' => 'Literature',
            'Novel' => 'Novel',
            'Science and Technology' => 'Science and Technology',
            'Humanities' => 'Humanities',
            'Art' => 'Art',
            'Lifestyle' => 'Lifestyle',
            'Children' => 'Children',
            'Young Adult' => 'Young Adult',
        ],
        'genres' => [
            'select_all' => 'Select all',
            'Poetry' => 'Poetry',
            'Theater' => 'Theater',
            'Essay' => 'Essay',
            'Short Story' => 'Short Story',
            'Classics' => 'Classics',
            'Historical Novel' => 'Historical Novel',
            'Crime Novel' => 'Crime Novel',
            'Science Fiction Novel' => 'Science Fiction Novel',
            'Romantic Novel' => 'Romantic Novel',
            'Mathematics' => 'Mathematics',
            'Physics' => 'Physics',
            'Biology' => 'Biology',
            'Computer Science' => 'Computer Science',
            'Philosophy' => 'Philosophy',
            'Psychology' => 'Psychology',
            'Sociology' => 'Sociology',
            'History' => 'History',
            'Politics' => 'Politics',
            'Painting' => 'Painting',
            'Photography' => 'Photography',
            'Architecture' => 'Architecture',
            'Music' => 'Music',
            'Cinema' => 'Cinema',
            'Health and Wellness' => 'Health and Wellness',
            'Nutrition' => 'Nutrition',
            'Sport' => 'Sport',
            'Travel' => 'Travel',
            'Children\'s Stories' => 'Children\'s Stories',
            'Illustrated Books' => 'Illustrated Books',
            'Educational Books' => 'Educational Books',
            'Young Adult Novel' => 'Young Adult Novel',
            'Young Adult Fantasy' => 'Young Adult Fantasy',
            'Young Adult Thriller' => 'Young Adult Thriller',
        ],
        'fields'=>[
            'title'=> 'Title',
            'author'=> 'Author',
            'genre' => 'Genre',
            'editorial'=> 'Editorial',
            'floor' => 'Floor',
            'zone' => 'Zone',
            'bookcase'=> 'Bookcase',
            'image'=> 'Cover Image',
        ],
        'QR_create'=>[
            'title'=> 'Create QR Code:',
            'book_title'=> 'Title: ',
            'book_author'=> 'Author: ',
            'book_ISBN'=> 'ISBN: ',
            'save'=> 'Download it',
        ],
        'QR_reader'=> [
            'title'=> 'QR Code Reader',
            'description'=> 'Select the image',
            'book_title'=> 'Title: ',
            'book_author'=> 'Author: ',
            'book_ISBN'=> 'ISBN: ',
            'book_availability'=> 'Availability: ',
            'bookcase'=> 'Bookcase: ',
            'zone'=> 'Zone: ',
            'floor'=> 'Floor: ',
            'loaned' => 'Loaned',
            'not_loaned' => 'Not Loaned',
            'reserved'=> 'Reserved',
            'not_reserved'=> 'Not Reserved',
        ],
         'export'=> 'Export books',
         'import'=> 'Import books',
         'options'=> 'Options',
         'import_title'=> 'Import new books',
         'import_description' => 'Import an excel file with new books data',
        'imported'=> [
            'select'=> 'Select file',
            'file'=> 'Selected file:  ',
            'button'=> 'Import books',
         ]

    ],
    'loans' => [
        'title' => 'Loans',
        'description' => 'Manage the loans',
        'active' => 'View active loans',
        'ISBN_list' => ':ISBN',
        'card' => [
            'create' => 'Make a loan:',
            'new' => 'New loan',
        ],
        'filters' => [
            'title' => 'Title',
            'author' => 'Author',
            'ISBN' => 'ISBN',
            'name' => 'User name',
            'start_loan' => 'Start loan',
            'due_date' => 'Due date',
            'end_loan' => 'Return date',
            'days_overdue' => 'Days overdue',
            'active' => 'Loan status',
            'active_status' => 'In progress',
            'inactive_status' => 'Finished',
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'ISBN' => 'ISBN...',
            'start_loan' => 'Date Start loan',
            'due_date' => 'Due date',
            'end_loan' => 'Return date',
            'days_overdue' => 'Days overdue...',
            'active' => 'In progress/Finished loan...',
            'selectISBN' => 'Select the book ISBN',
        ],
        'buttons' => [
            'new' => 'New Loan',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
            'return' => 'Return the book',
            'renew' => 'Renew the loan',

        ],
        'columns' => [
            'title' => 'Title',
            'author' => 'Author',
            'ISBN' => 'ISBN',
            'name' => 'User name',
            'start_loan' => 'Start loan',
            'end_loan' => 'Returned',
            'due_date' => 'Loan due date',
            'days_overdue' => 'Days overdue',
            'active' => 'Active/Inactive loan',
            'email' => 'User email',
            'delete' => 'Delete',
            'edit' => 'Edit Loan',
        ],
        'fields' => [
            'ISBN' => 'ISBN',
            'not_returned' => 'Not returned yet',
            'returned' => 'Returned: ',
        ],
        'Export'=> 'Export loans',
    ],
    'reserves' => [
        'title' => 'Reservations',
        'description' => 'Manage the book reservations',
        'card' => [
            'create' => 'Make a book reservation:',
            'new' => 'New book reservation',
            'not_available' => 'The book is already loaned, we would send you an email when it is available',
            'book' => 'Book data:',
        ],
        'filters' => [
            'title' => 'Title',
            'author' => 'Author',
            'ISBN' => 'ISBN',
            'name' => 'User name',
            'contacted' => 'Contacted',
            'waiting' => 'Waiting',
            'status' => 'Reservation Status',
            'finished' => 'Finished',
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'ISBN' => 'ISBN...',
            'status' => 'Status',
        ],
        'buttons' => [
            'new' => 'New Reservation',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
            'loan' => 'Make loan'
        ],
        'columns' => [
            'title' => 'Title',
            'author' => 'Author',
            'ISBN' => 'ISBN',
            'name' => 'User name',
            'email' => 'User email',
            'delete' => 'Delete',
            'edit' => 'Edit Reservation',
            'loan' => 'Make loan',
            'status' => 'Reservation Status',
        ],
        'fields' => [
            'ISBN' => 'ISBN',
        ],
        'messages' => [
            'title' => 'Do you want to loan the book?',
            'description' => 'The book is already available.',
        ],
        'status' => [
            'waiting' => 'Waiting',
            'contacted' => 'User contacted',
            'finished' => 'Finished'
        ],
        'delete' => [
            'title' => 'Are you sure you want to delete this reservation?',
            'description' => 'Information would be safe on data base'
        ],
        'export'=> 'Export reservations',
    ],
    'statistics' => [
        'title' => 'Statistics',
        'description' => 'Check the statistics',
        'loans' => [
            'legend' => 'Loans'
        ],
        'reserves' => [
            'legend' => 'Reservations'
        ],
        'navigation' => [
            'bookIndex' => 'Books statistics',
            'userIndex' => 'Users statistics',
            'zoneIndex' => 'Zones statistics',
            'all' => 'Statistics'
        ],
        'books' => [
            'title' => 'More read books',
        ],
        'users' => [
            'title' => 'More active users',
        ],
        'zones' => [
            'title' => 'More moved zones',
        ]

    ]
];
