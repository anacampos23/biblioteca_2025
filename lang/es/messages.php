<?php

return [
    'users' => [
        'created' => 'Usuario creado correctamente',
        'updated' => 'Usuario actualizado correctamente',
        'deleted' => 'Usuario eliminado correctamente',
        'error' => [
            'create' => 'Error al crear el usuario',
            'update' => 'Error al actualizar el usuario',
            'delete' => 'Error al eliminar el usuario',
        ],
    ],
    'floors' => [
        'created' => 'Piso creado correctamente',
        'updated' => 'Piso actualizado correctamente',
        'deleted' => 'Piso eliminado correctamente',
        'error' => [
            'create' => 'Error al crear el piso',
            'update' => 'Error al actualizar el piso',
            'delete' => 'Error al eliminar el piso',
        ],
    ],
    'zones' => [
        'created' => 'Zona creada correctamente',
        'updated' => 'Zona actualizada correctamente',
        'deleted' => 'Zona eliminada correctamente',
        'error' => [
            'create' => 'Error al crear la zona',
            'update' => 'Error al actualizar la zona',
            'delete' => 'Error al eliminar la zona',
        ],
    ],
       'bookcases' => [
        'created' => 'Estantería creada correctamente',
        'updated' => 'Estantería actualizada correctamente',
        'deleted' => 'Estantería eliminada correctamente',
        'error' => [
            'create' => 'Error al crear la Estantería',
            'update' => 'Error al actualizar la Estantería',
            'delete' => 'Error al eliminar la Estantería',
        ],
    ],
    'books' => [
        'created' => 'Libro creado correctamente',
        'updated' => 'Libro actualizado correctamente',
        'deleted' => 'Libro eliminado correctamente',
        'error' => [
            'create' => 'Error al crear el libro',
            'update' => 'Error al actualizar el libro',
            'delete' => 'Error al eliminar el libro',
        ],
        'loan_reserve' => 'El libro está disponible. Puedes realizar directamente un préstamo.',
        'imported'=> 'Libros importados con éxito',
        'not_file'=> 'Por favor, selecciona un archivo para importar',
        'not_excel'=> 'El archivo debe ser formato xlsx o xls o csv',
    ],

    'loans' => [
        'created' => 'Préstamo creado correctamente',
        'updated' => 'Préstamo actualizado correctamente',
        'deleted' => 'Préstamo eliminado correctamente',
        'error' => [
            'create' => 'Error al crear el préstamo',
            'update' => 'Error al actualizar el préstamo',
            'delete' => 'Error al eliminar el préstamo',
        ],
    ],
    'reserves' => [
        'created' => 'Reserva creada correctamente',
        'updated' => 'Reserva actualizada correctamente',
        'deleted' => 'Reserva eliminada correctamente',
        'error' => [
            'create' => 'Error al crear la reserva',
            'update' => 'Error al actualizar la reserva',
            'delete' => 'Error al eliminar la reserva',
            'delete_not_finished' => 'No puedes eliminar una reserva que está en proceso'
        ],
    ],
];
