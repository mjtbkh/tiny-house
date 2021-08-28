import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { Listings as ListingData } from './__generated__/Listings'
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from './__generated__/DeleteListing'

const LISTINGS = gql`
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
const DELETE_LISTING = gql`
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
  const title = 'TinyHouse Listings'

  // eslint-disable-next-line
  const { data, loading, error, refetch } = useQuery<ListingData>(LISTINGS)

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } }).then(() => refetch())
  }
  const listings = data ? data.listings : null
  // eslint-disable-next-line
  const List = () =>
    // eslint-disable-next-line
    listings ? (
      <ul>
        {' '}
        {listings.map((listing: any) => (
          <ol key={listing.id} id={listing.id}>
            {`${listing.title} - ${listing.address}`}
            <button
              type="button"
              onClick={() => handleDeleteListing(listing.id.toString())}
            >
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
      <List />
      {deleteListingLoading}
      {deleteListingErrorMessage}
    </>
  )
}

export default Listings
