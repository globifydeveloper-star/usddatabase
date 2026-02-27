import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Link from 'next/link'
import { Table } from 'react-bootstrap'
import { pool } from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schools',
  other: { subTitle: 'Schools List' },
}

const LIMIT = 50

async function getSchools(page: number) {
  const offset = (page - 1) * LIMIT

  const schools = await pool.query(
    `
    SELECT 
      unitid,
      name,
      city,
      state,
      zip,
      address,
      accreditor,
      degrees_awarded,
      school_url,
      ope8_id
    FROM schools
    ORDER BY name ASC
    LIMIT $1 OFFSET $2
  `,
    [LIMIT, offset]
  )

  const total = await pool.query(`SELECT COUNT(*) FROM schools`)

  return {
    schools: schools.rows,
    total: Number(total.rows[0].count),
  }
}

const SchoolsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string }
}) => {
  const page = Number(searchParams.page) || 1

  const { schools, total } = await getSchools(page)

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <ComponentContainerCard title="Schools List">
      <div className="table-responsive">
        <Table className="table-striped mb-0 align-middle">
          <thead>
            <tr>
              <th>Unit ID</th>
              <th>School Name</th>
              <th>City</th>
              <th>State</th>
              <th>ZIP</th>
              <th>Address</th>
              <th>Accreditor</th>
              <th>Degrees</th>
              <th>Website</th>
              <th>OPE8</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {schools.map((school: any) => (
              <tr key={school.unitid}>
                <td>{school.unitid}</td>
                <td>{school.name}</td>
                <td>{school.city}</td>
                <td>{school.state}</td>
                <td>{school.zip}</td>
                <td>{school.address}</td>
                <td>{school.accreditor}</td>
                <td>{school.degrees_awarded}</td>
                <td>
                  {school.school_url && (
                    <a
                      href={school.school_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                  )}
                </td>
                <td>{school.ope8_id}</td>

                <td>
                  <Link href={`/admin/schools/edit/${school.unitid}`}>
                    <IconifyIcon icon="tabler:pencil" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Page {page} of {totalPages}
        </span>

        <div>
          {page > 1 && (
            <Link
              href={`/admin/schools?page=${page - 1}`}
              className="btn btn-sm btn-outline-primary me-2"
            >
              Previous
            </Link>
          )}

          {page < totalPages && (
            <Link
              href={`/admin/schools?page=${page + 1}`}
              className="btn btn-sm btn-outline-primary"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </ComponentContainerCard>
  )
}

export default SchoolsPage