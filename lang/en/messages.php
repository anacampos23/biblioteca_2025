<?php

return [
    'users' => [
        'created' => 'User created successfully',
        'updated' => 'User updated successfully',
        'deleted' => 'User deleted successfully',
        'error' => [
            'create' => 'Error creating user',
            'update' => 'Error updating user',
            'delete' => 'Error deleting user',
        ],
    ],
    'floors' => [
        'created' => 'Floor created successfully',
        'updated' => 'Floor updated successfully',
        'deleted' => 'Floor deleted successfully',
        'error' => [
            'create' => 'Error creating floor',
            'update' => 'Error updating floor',
            'delete' => 'Error deleting floor',
        ],
    ],
    'zones' => [
        'created' => 'Zone created successfully',
        'updated' => 'Zone updated successfully',
        'deleted' => 'Zone deleted successfully',
        'error' => [
            'create' => 'Error creating zone',
            'update' => 'Error updating zone',
            'delete' => 'Error deleting zone',
        ],
    ],
    'books' => [
        'created' => 'Book created successfully',
        'updated' => 'Book updated successfully',
        'deleted' => 'Book deleted successfully',
        'error' => [
            'create' => 'Error creating book',
            'update' => 'Error updating book',
            'delete' => 'Error deleting book',
        ],
        'loan_reserve' => 'The book is available. You can already loan it.',
        'imported'=> 'Books imported successfully',
        'not_file'=> 'Please, select a file to be imported',
        'not_excel'=> 'The file should be xlsx or xls or csv',
    ],
    'bookcases' => [
        'created' => 'Bookcase created successfully',
        'updated' => 'Bookcase updated successfully',
        'deleted' => 'Bookcase deleted successfully',
        'error' => [
            'create' => 'Error creating bookcase',
            'update' => 'Error updating bookcase',
            'delete' => 'Error deleting bookcase',
        ],
    ],
    'loans' => [
        'created' => 'Loan created successfully',
        'updated' => 'Loan updated successfully',
        'deleted' => 'Loan deleted successfully',
        'error' => [
            'create' => 'Error creating loan',
            'update' => 'Error updating loan',
            'delete' => 'Error deleting loan',
        ],
    ],
    'reserves' => [
        'created' => 'Reservation created successfully',
        'updated' => 'Reservation updated successfully',
        'deleted' => 'Reservation deleted successfully',
        'error' => [
            'create' => 'Error creating reservation',
            'update' => 'Error updating reservation',
            'delete' => 'Error deleting reservation',
            'delete_not_finished' => 'You can not delete a current reservation'
        ],
    ],
];
