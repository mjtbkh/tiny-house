import React, { useState } from 'react'
import useQuery from '../../lib/api/useQuery'
import useMutation from '../../lib/api/useMutation'
import { ListingData, DeleteListingData, DeleteListingVariables } from './types'

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`
const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`

const Listings: React.FC = () => {
  const [id, setId] = useState<string>('')
  const title = 'TinyHouse Listings'

  // eslint-disable-next-line
  const { data, loading, error, refetch } = useQuery<ListingData>(LISTINGS)
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)
  const handleDeleteListing = async () => {
    await deleteListing({ id })
    refetch()
  }
  const listings = data ? data.listings : null
  // eslint-disable-next-line
  const List = () =>
    // eslint-disable-next-line
    listings ? (
      <ul>
        {listings && // eslint-disable-line
          listings.map((listing: any) => (
            <ol key={listing.id}>
              {
                // eslint-disable-next-line
                `${listing.title} - ${listing.address}`
              }
              <button type="button" onClick={handleDeleteListing}>
                Delete!
              </button>
            </ol>
          ))}
      </ul>
    ) : (
      <>
        <span>NOTHING</span>
      </>
    )

  if (loading) return <h2>Loading...</h2>
  if (error) {
    return <h2>Uh oh! Something went wrong! - Please try again later</h2>
  }
  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deleting...</h4>
  ) : null
  const deleteListingErrorMessage = deleteListingLoading ? (
    <h4>Deleteing failed! please try again later...</h4>
  ) : null
  return (
    <>
      <h2>{title}</h2>
      <hr />
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="button" onClick={handleDeleteListing}>
        Delete a listing
      </button>
      <List />
      {deleteListingLoading}
      {deleteListingErrorMessage}
    </>
  )
}

export default Listings
