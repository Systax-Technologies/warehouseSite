import { XCircleIcon } from "@heroicons/react/solid";

export function BackendError() {
  return (
    <div className="pb-3">
      <div className="rounded-md bg-red-50 p-4 border-solid border-2 border-red-400">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              The backend returned bad data!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
