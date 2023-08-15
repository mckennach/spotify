import { Session } from "next-auth";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import spotifyApi from "@/lib/spotify";

const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
}


const Image = ({session}: {session: Session}) => {
        if(session?.user?.image) {
            return <img  src={session?.user?.image}  className="rounded-full h-7 w-7"  alt="Profile Image" />
        } 
        return <UserCircleIcon className="rounded-full h-7 w-7"/>
}

const UserHeaderMenu = ({ session, status }: { session: any, status: String }) => {
    // const accountLink = spotifyApi.getUser();


    if(status === 'loading' && !session) return null;
    
    return (
        <Menu as="div" className=" inline-block text-left absolute top-5 right-8">
            <div>
                <Menu.Button className="flex items-center bg-neutral-900  opacity-90 hover:opacity-80 cursor-pointer rounded-full p-0.5">
                    <Image session={session} />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute  right-0 mt-2 w-56 origin-top-right divide-y divide-neutral-500 rounded-md bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                            {({ active }) => (
                                <button
                                className={classNames(
                                    active ? 'bg-gray-600 text-white flex justify-between' : 'text-white',
                                    'block px-4 py-2 text-sm w-full text-left flex justify-between items-center'
                                )}>
                                    Account
                                    <ArrowTopRightOnSquareIcon className="w-4" />
                                </button>  
                            )}
                            </Menu.Item>
                            <Menu.Item>
                            {({ active }) => (
                                <button

                                className={classNames(
                                    active ? 'bg-gray-600 text-white' : 'text-white',
                                    'block px-4 py-2 text-sm w-full text-left'
                                )}
                                >
                                Profile
                                </button>
                            )}
                            </Menu.Item>
                            <Menu.Item>
                            {({ active }) => (
                                <button

                                className={classNames(
                                    active ? 'bg-gray-600 text-white' : 'text-white',
                                    'block px-4 py-2 text-sm w-full text-left'
                                )}
                                >
                                Private session
                                </button>
                            )}
                            </Menu.Item>
                            <Menu.Item>
                            {({ active }) => (
                                <button

                                className={classNames(
                                    active ? 'bg-gray-600 text-white' : 'text-white',
                                    'block px-4 py-2 text-sm w-full text-left'
                                )}
                                >
                                Settings
                                </button>
                            )}
                            </Menu.Item>
                        </div>
                       
                        <div className="py-1">
                            <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => signOut()}
                                    className={classNames(
                                    active ? 'bg-gray-600 text-white' : 'text-white',
                                    'block px-4 py-2 text-sm w-full text-left'
                                )}
                                >
                                Logout
                                </button>
                            )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
        // <div className="absolute top-5 right-8">
        //     <div className="flex items-center bg-neutral-900 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
        //         <img 
        //         src={session?.user?.image} 
        //         className="rounded-full w-90" 
        //         alt="Profile Image" />
        //         <h2>{session?.user?.name}</h2>
        //         {/* <ChevronDownIcon className="h-5 w-5" /> */}
        //     </div>
        // </div>
    )
}

export default UserHeaderMenu;