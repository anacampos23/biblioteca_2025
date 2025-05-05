<?php

namespace App\Users\Controllers;

use App\Core\Controllers\Controller;
use Domain\Loans\Models\Loan;
use Domain\Permissions\Models\Permission;
use Domain\Reserves\Models\Reserve;
use Domain\Roles\Models\Role;
use Domain\Users\Actions\UserDestroyAction;
use Domain\Users\Actions\UserIndexAction;
use Domain\Users\Actions\UserStoreAction;
use Domain\Users\Actions\UserUpdateAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('users/Index');
    }
    public function show(Request $request, User $user)
    {
        $loans = Loan::withTrashed()
            ->with(['book:id,title,author,ISBN'])
            ->select(['id', 'start_loan', 'end_loan', 'due_date', 'active', 'user_id', 'book_id'])
            ->orderBy('start_loan', 'desc')
            ->get()
            ->map(function ($loan) {
                // Calcular days_overdue para cada préstamo
                $loan->days_overdue = $loan->days_overdue; // Este es el accesor que ya calculaste en el modelo
                return $loan;
            })
            ->toArray();

        $reserves = Reserve::withTrashed()
            ->with(['book:id,title,author,ISBN'])
            ->select(['id', 'status', 'user_id', 'book_id', 'created_at', 'deleted_at'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->toArray();

        $loansAndReserves = collect(array_merge($loans, $reserves))
            ->map(function ($item) {
                if (isset($item['start_loan'])) {
                    $item['type'] = 'loan';
                    $item['sort_date'] = $item['start_loan'];
                } else {
                    $item['type'] = 'reserve';
                    $item['sort_date'] = $item['created_at'];
                }
                return $item;
            })
            ->sortByDesc('sort_date') // Orden descendente
            ->values() // Reindexar
            ->toArray();
        return Inertia::render('users/Show', [
            'user' => $user,
            'status' => $request->session()->get('status'),
            'loans' => $loans,
            'reserves' => $reserves,
            'combined' => $loansAndReserves,
        ]);
    }
    public function create()
    {
        $allRolesInDatabase = Role::all();
        $roles = $allRolesInDatabase->pluck('name');

        $permisos = Permission::all()->pluck('name');

        $permisosAgrupados = $permisos->groupBy(fn($p) => explode('.', $p)[0])->map->toArray();

        $rolesConPermisos = Role::with('permissions')->get();

        $relacionRolesPermisos = $rolesConPermisos->mapWithKeys(function ($role) {
            return [$role->name => $role->permissions->pluck('name')];
        });

        return Inertia::render('users/Create', ['roles' => $roles, 'rolesConPermisos' => $relacionRolesPermisos, 'permisos' => $permisos, 'permisosAgrupados' => $permisosAgrupados]);
    }

    public function store(Request $request, UserStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'permisos' => ['nullable'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('users.index')
            ->with('success', __('messages.users.created'));
    }

    public function edit(Request $request, User $user)
    {

        $allRolesInDatabase = Role::all();
        $roles = $allRolesInDatabase->pluck('name');

        $permisos = Permission::all()->pluck('name');

        $permisosAgrupados = $permisos->groupBy(fn($p) => explode('.', $p)[0])->map->toArray();

        $rolesConPermisos = Role::with('permissions')->get();

        $relacionRolesPermisos = $rolesConPermisos->mapWithKeys(function ($role) {
            return [$role->name => $role->permissions->pluck('name')];
        });

        $permisosDelUsuario = $user->getPermissionNames();

        return Inertia::render('users/Edit', [
            'user' => $user,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'roles' => $roles,
            'rolesConPermisos' => $relacionRolesPermisos,
            'permisos' => $permisos,
            'permisosAgrupados' => $permisosAgrupados,
            'permisosDelUsuario' => $permisosDelUsuario,
        ]);
    }

    public function update(Request $request, User $user, UserUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8'],
            'permisos' => ['nullable']
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($user, $validator->validated());

        $redirectUrl = route('users.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.users.updated'));
    }

    public function destroy(User $user, UserDestroyAction $action)
    {
        $action($user);

        return redirect()->route('users.index')
            ->with('success', __('messages.users.deleted'));
    }
}
