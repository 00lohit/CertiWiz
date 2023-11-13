import { Update } from "@/components/NavMenu/Update";
import { format } from "date-fns";

export default function Event({ params }: { params: { id: string } }) {
  let { id } = params;

  return (
    <div className="bg-red h-full w-full">
      <div className="grid lg:grid-cols-5 h-full">
        <Sidebar id={id} />
      </div>
    </div>
  );
}

async function getEvent(id: string) {
  let res = await fetch(process.env.NEXTAUTH_URL + `/api/events/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function Sidebar({ id }: { id: string }) {
  let {
    data: { creator, date, editable, name },
  } = await getEvent(id);
  let dateText = date && format(new Date(date), "dd-MM-yyyy");

  return (
    <div className={"border-r overflow-hidden flex flex-col relative"}>
      <Update id={id} />
      {/* <Button
        className={"absolute z-10 right-2 top-2"}
        variant="ghost"
        size="icon"
      >
        <div
          onClick={() => {}}
          className="w-full h-full flex items-center justify-center"
        >
          <EditIcon className="h-4 w-4" />
        </div>
      </Button> */}
      <div className="px-3 py-2 mt-4">
        <p className="text-sm  opacity-50">Event Name</p>
        <h2 className="mb-2 text-3xl font-semibold">{name}</h2>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm  opacity-50">Creator Name</p>
        <h2 className="mb-2 text-xl font-medium">{creator}</h2>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm  opacity-50">Date</p>
        <h2 className="mb-2 text-lg font-medium">{dateText}</h2>
      </div>
    </div>
  );
}
