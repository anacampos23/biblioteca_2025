import { FormEvent, useState } from 'react'
import { router } from '@inertiajs/react'

const ImportBooksForm = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!file) {
      alert('Por favor, selecciona un archivo.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    router.post('/books/import', formData, {
      forceFormData: true,
      onSuccess: () => {
        alert('¡Libros importados correctamente!')
      },
      onError: (errors) => {
        alert('Error al importar libros.')
        console.error(errors)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        required
      />
      <button type="submit">Importar libros</button>
    </form>
  )
}

export default ImportBooksForm
