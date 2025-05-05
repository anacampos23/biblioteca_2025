'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserComboboxProps {
  users: User[];
  onSelectUser: (userId: string) => void;
}

export function UserCombobox({ users, onSelectUser }: UserComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const selectedUser = users.find((user) => user.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {selectedUser ? selectedUser.email : "Seleccionar usuario..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Buscar email..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontró ningún usuario.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.email} // filtra por email
                  onSelect={() => {
                    setValue(user.id)
                    onSelectUser(user.id)
                    setOpen(false)
                  }}
                >
                  {user.email}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
