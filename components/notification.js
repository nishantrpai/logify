export const Notification = ({ alert, setalert }) => {

  return (
    <div className={`flex absolute right-20 z-10 transition duration-300 ease-in-out`}>
      <div className="m-auto">
        <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-xl">
          <div className="flex flex-row">
            {alert == 'success' &&
              <div className="px-1 py-3">
                <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                </svg>
              </div>
            }

            <i onClick={() => { setalert('') }}
              className="absolute cursor-pointer h-8 w-8 right-2 
              text-gray-300 top-2 text-right fas fa-times"
            />

            {alert == 'success' &&
              <div className="ml-2 mr-6">
                <span className="font-semibold">Copied</span>
              </div>
            }
            {alert == 'error' &&
              <div className="ml-2 mr-6">
                <span className="font-semibold">Oops 😓</span>
                <span className="block text-gray-500">Unable to copy!</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}