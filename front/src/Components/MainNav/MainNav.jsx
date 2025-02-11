import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2-5.png';

//icons
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsPaypal } from "react-icons/bs";
import { FaUser } from 'react-icons/fa';
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaBuildingColumns } from "react-icons/fa6";



export default function MainNav() {
  return (
    <Navbar rounded className='m-6 shadow-lg rounded-2xl'>
      <Link to="/products">
        <div className="flex items-center justify-between w-14">
          <img src={logo} className='w-full' alt="Three E S for solutions" />
        </div>
      </Link>
      <div className='flex md:order-2'>
        <Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded />}>
          <Dropdown.Header>
            <span className='block text-sm'>Bonnie Green</span>
            <span className='block truncate text-sm font-medium'>name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {/* <Navbar.Link>
          <Link to='/' className='flex items-center py-4 border-b-4 rounded border-transparent hover:border-black hover:text-black'>
            <IoMdHome className='text-xl' />
            <span>Home</span>
          </Link>
        </Navbar.Link> */}
        <Navbar.Link>
          <Link to='/products' className='flex items-center py-4 border-b-4 rounded border-transparent hover:border-black hover:text-black space-x-2'>
            <MdOutlineProductionQuantityLimits  className='text-xl' />
            <span>Products</span>
          </Link>
        </Navbar.Link>
        
        <Navbar.Link>
          <Link to='/cart' className='flex items-center py-4 border-b-4 rounded border-transparent hover:border-black hover:text-black space-x-2'>
            <FaShoppingCart className='text-xl' />
            <span>Cart</span>
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to='/categories' className='flex items-center py-4 border-b-4 rounded border-transparent hover:border-black hover:text-black space-x-2'>
            <BiSolidCategory  className='text-xl' />
            <span>Categories</span>
          </Link>
        </Navbar.Link>

        <Navbar.Link>
          <Link to='/units' className='flex items-center py-4 border-b-4 rounded border-transparent hover:border-black hover:text-black space-x-2'>
            <FaBuildingColumns  className='text-xl' />
            <span>Units</span>
          </Link>
        </Navbar.Link>

        <Navbar.Link>
          <Link to='/orders' className='flex items-center py-4 border-b-4 rounded border-transparent hover:border-black hover:text-black space-x-2'>
            <FaCodePullRequest className='text-xl' />
            <span>Orders</span>
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
