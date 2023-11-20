import { useState } from 'react'
import { category_1, category_2, category_3 } from '../constants/miso'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const StrainForm = () => {
	// const [ cat_1, setCat_1 ] = useState();
	// const [ cat_2, setCat_2 ] = useState();
	// const [ cat_3, setCat_3 ] = useState();

  return (
    <form>
			<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dimBlack">
        Add Strain
      </h2>

      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-10">

          <div className="space-y-12 bg-primary justify-center items-center ">
            <h4 className="mt-10 font-bold  text-dimWhite px-2 py-2">
              Name and Taxonomic Classification
            </h4>
          </div>

					<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

						<div className="col-span-full">
							<label htmlFor="strain_name" className="block text-sm font-medium leading-6 text-dimBlack">
								Strain name
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="strain_name"
									id="strain_name"
									autoComplete="strain_name"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label htmlFor="scientific_name" className="block text-sm font-medium leading-6 text-dimBlack">
								Scientific name
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="scientific_name"
									id="scientific_name"
									autoComplete="scientific_name"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="domain" className="block text-sm font-medium leading-6 text-dimBlack">
								Domain
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="domain"
									id="domain"
									autoComplete="domain"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="phylum" className="block text-sm font-medium leading-6 text-dimBlack">
								Phylum
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="phylum"
									id="phylum"
									autoComplete="phylum"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="class" className="block text-sm font-medium leading-6 text-dimBlack">
								Class
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="class"
									id="class"
									autoComplete="class"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="order" className="block text-sm font-medium leading-6 text-dimBlack">
								Order
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="order"
									id="order"
									autoComplete="order"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="family" className="block text-sm font-medium leading-6 text-dimBlack">
								Family
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="family"
									id="family"
									autoComplete="family"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="genus" className="block text-sm font-medium leading-6 text-dimBlack">
								Genus
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="genus"
									id="genus"
									autoComplete="genus"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="species" className="block text-sm font-medium leading-6 text-dimBlack">
								Species
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="species"
									id="species"
									autoComplete="species"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-10">
          <div className="space-y-12 bg-primary justify-center items-center ">
            <h4 className="mt-10 font-bold  text-dimWhite px-2 py-2">
              Isolation, sampling, and environmental information
            </h4>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            
            <div className="sm:col-span-full">
							<label htmlFor="isolation_source" className="block text-sm font-medium leading-6 text-dimBlack">
								Sample type/Isolated from
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="isolation_source"
									id="isolation_source"
									autoComplete="isolation_source"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

            <div className="sm:col-span-3 sm:col-start-1">
							<label htmlFor="cave_name" className="block text-sm font-medium leading-6 text-dimBlack">
								Cave name
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="cave_name"
									id="cave_name"
									autoComplete="cave_name"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

            <div className="sm:col-span-3">
							<label htmlFor="city_province" className="block text-sm font-medium leading-6 text-dimBlack">
								City/Province
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="city_province"
									id="city_province"
									autoComplete="city_province"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

            <div className="sm:col-span-3 sm:col-start-1">
							<label htmlFor="location_latitude" className="block text-sm font-medium leading-6 text-dimBlack">
								Location latitude
							</label>
							<div className="mt-1">
								<input
									type="number"
									name="location_latitude"
									id="location_latitude"
									autoComplete="location_latitude"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

            <div className="sm:col-span-3">
							<label htmlFor="location_longitude" className="block text-sm font-medium leading-6 text-dimBlack">
								Location longitude
							</label>
							<div className="mt-1">
								<input
									type="number"
									name="location_longitude"
									id="location_longitude"
									autoComplete="location_longitude"
									className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<label className="sm:col-span-full text-sm font-medium leading-6 text-dimBlack">
							MISO categories
						</label>

						<div className="sm:col-span-2 sm:col-start-1 mt-1">
              <select
                id="miso_cat1"
                name="miso_cat1"
                autoComplete="miso_cat1"
                className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {category_1.map((item) => (
									<option className={classNames(`${item.color_code} hover:bg-white`)}>
										{item.name}
									</option>
								))}
              </select>
            </div>

						<div className="sm:col-span-2 mt-1">
              <select
                id="miso_cat2"
                name="miso_cat2"
                autoComplete="miso_cat2"
                className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
              >
								{category_2.map((item) => (
									<option >
										{item.name}
									</option>
								))}
							</select>
            </div>

						<div className="sm:col-span-2 mt-1">
              <select
                id="miso_cat3"
                name="miso_cat3"
                autoComplete="miso_cat3"
                className="block w-full rounded-md border-0 py-1.5 text-dimBlack shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
              >
								{category_3.map((item) => (
									<option value={item.name}>
										{item.name}
									</option>
								))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dimBlack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Strain
        </button>
      </div>
    </form>
  )
}

export default StrainForm