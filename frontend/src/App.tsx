import './App.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {

  Package2,
  PanelLeft,


} from "lucide-react"
// import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  TooltipProvider
} from "@/components/ui/tooltip"

function App() {
  const [tickets, setTickets] = useState([]);
  const [parsed, setParsed] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages state
  const [weatherReports, setWeatherReports] = useState([]); // State for weather reports



  const parseTickets = async (page: number) => {
    const response = await axios.post('http://localhost:8000/api/parse-tickets-in-batches', {
      filePath: './backend/data/dataset.csv',
      page: page,
    });
    return response.data;
  };

   // Fetch weather reports for parsed tickets
   const fetchWeatherReports = async (tickets: any[]) => {
    const response = await axios.post('http://localhost:8000/api/weather-reports', {
      tickets: tickets,
    });
    return response.data;
  };

  // Fetch weather reports after tickets are parsed
  useEffect(() => {
    if (parsed && tickets.length > 0) {
      fetchWeatherReports(tickets).then((weatherData) => {
        setWeatherReports(weatherData); // Store fetched weather reports
      }).catch((error) => {
        console.error("Error fetching weather reports:", error);
      });
    }
  }, [parsed, tickets]); // Trigger only when tickets are parsed

  const { isLoading, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['tickets', page],
      queryFn: () => parseTickets(page),
      placeholderData: keepPreviousData,// This keeps previous data when fetching the next page
      staleTime: 5000,
    });

  // Use useEffect to update tickets and parsed state when data is fetched
  useEffect(() => {
    if (data) {
      setTickets(data.tickets); // Update tickets state when new data is available
      setParsed(true);  // Mark parsed as true when data is successfully parsed
      setTotalPages(data.totalPages);
    }
  }, [data]); // This effect runs when `data` changes





  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <div>
        {isFetching ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {JSON.stringify(error)}</div>
        ) : (
          <div>


            <TooltipProvider>

              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                  <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <a
                      href="./"
                      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                      <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                      <span className="sr-only">Weather App</span>
                    </a>




                  </nav>

                </aside>
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                  <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                          <PanelLeft className="h-5 w-5" />
                          <span className="sr-only">Toggle Menu</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                          <a
                            href="./"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                          >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">WeatherApp</span>
                          </a>


                        </nav>
                      </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <a href="/">Dashboard</a>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />


                      </BreadcrumbList>
                    </Breadcrumb>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="overflow-hidden rounded-full"
                        >

                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </header>
                  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card
                          className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                        >
                          <CardHeader className="pb-3">
                            <CardTitle>Description</CardTitle>
                            <CardDescription className="text-balance max-w-lg leading-relaxed">
                            The fetching of each batch is one minute.
                            </CardDescription>
                          </CardHeader>

                        </Card>
                        <Card x-chunk="dashboard-05-chunk-1">
                          <CardHeader className="pb-2">
                            <CardDescription>Page</CardDescription>
                            <CardTitle className="text-4xl">{page}</CardTitle>
                          </CardHeader>

                        </Card>

                      </div>
                      <Tabs defaultValue="week">
                        <div className="flex items-center">
                          <TabsList>
                            <TabsTrigger value="week">Tickets</TabsTrigger>

                          </TabsList>
                          <div className="ml-auto flex items-center gap-2">


                          </div>
                        </div>
                        <TabsContent value="week">
                          <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                              <CardTitle>Weather</CardTitle>
                              <CardDescription>
                                Weather data for each ticket's origin and destination airports.
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Airline</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                      Flight Number
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                      Origin
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                      Destination
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">

                                      Weather (Origin)
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                      Weather (Destination)
                                    </TableHead>

                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {
                                    weatherReports && weatherReports.length > 0 ? (
                                      <>

                                      {
                                        weatherReports.map((report: any, index: number) => (
                                          <TableRow key={index} className="bg-accent">
                                            <TableCell>

                                              <div className="hidden text-sm text-muted-foreground md:inline">
                                                {report.ticket.airline}
                                              </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                              {report.ticket.flightNumber}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                              <Badge className="text-xs" variant="secondary">
                                                {report.ticket.originCode} - {report.ticket.originAirport.name}
                                              </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                              {(report.originWeather.main.temp - 273.15).toFixed(2)}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                              {report.ticket.destinationCode} - {report.ticket.destinationAirport.name}
                                            </TableCell>
                                            <TableCell className="text-right">
                                              {(report.destinationWeather.main.temp - 273.15).toFixed(2)}
                                            </TableCell>
                                          </TableRow>
                                        ))
                                      }
                                    </>
                                    ) : (
                                      <>

                                      {
                                        tickets.map((ticket: any, index: number) => (
                                          <TableRow key={index} className="bg-accent">
                                            <TableCell>

                                              <div className="hidden text-sm text-muted-foreground md:inline">
                                                {ticket.airline}
                                              </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                              {ticket.flightNumber}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                              <Badge className="text-xs" variant="secondary">
                                                {ticket.originCode} - {ticket.originAirport.name}
                                              </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                              {ticket.destinationCode} - {ticket.destinationAirport.name}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                             Loading
                                            </TableCell>
                                            
                                            <TableCell className="text-right">
                                            Loading
                                            </TableCell>
                                          </TableRow>
                                        ))
                                      }
                                    </>
                                    )
                                  }

                                 

                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                    <div>

                    </div>
                  </main>
                </div>
              </div>
            </TooltipProvider>

            {/* Display weather reports */}
          <div>
            <h3>Weather Reports:</h3>
            {weatherReports.length > 0 ? (
              <p>Done</p>
            ) : (
              <p>Fetching weather reports... it takes 1 minute in order to avoid hitting </p>
            )}
          </div>


          </div>
        )}
      </div>
      <span>Current Page: {page}</span>

      {/* Previous Page Button */}
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))} // Ensure minimum page is 1
        disabled={page === 1} // Disable when on the first page
      >
        Previous Page
      </button>

      {/* Next Page Button */}
      <button
        onClick={() => {
          if (!isPlaceholderData && page < totalPages) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData || page >= totalPages} // Disable when on the last page
      >
        Next Page
      </button>

      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}

export default App;

