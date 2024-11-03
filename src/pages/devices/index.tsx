import { useState, useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {
  IconPencil,
  IconTrash,
  IconPlus,
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface User {
  id: number
  name: string
  email: string
}

const columnHelper = createColumnHelper<User>()

export default function Component() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
    { id: 5, name: 'Niolia culito ediondo', email: 'charlie@example.com' },
  ])
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('id', {
        header: 'Actions',
        cell: (info) => (
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingUser(info.row.original)}>
                  <IconPencil className='mr-2 h-5 w-5' aria-hidden='true' />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <Input
                    placeholder='Name'
                    value={editingUser?.name || ''}
                    onChange={(e) =>
                      setEditingUser((prev) => ({
                        ...prev!,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder='Email'
                    value={editingUser?.email || ''}
                    onChange={(e) =>
                      setEditingUser((prev) => ({
                        ...prev!,
                        email: e.target.value,
                      }))
                    }
                  />
                  <Button onClick={updateUser}>Update User</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={() => deleteUser(info.getValue())}>
              <IconTrash className='mr-2 h-5 w-5' aria-hidden='true' />
            </Button>
          </div>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }])
      setNewUser({ name: '', email: '' })
    }
  }

  const updateUser = () => {
    if (editingUser) {
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      )
      setEditingUser(null)
    }
  }

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Dispositivos</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className='mb-4'>
            <IconPlus className='mr-2 h-4 w-4' /> Add User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo dispositivo</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Input
              placeholder='Name'
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder='Email'
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Button onClick={addUser}>Add User</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <IconChevronUp className='ml-2 h-4 w-4' />,
                        desc: <IconChevronDown className='ml-2 h-4 w-4' />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
