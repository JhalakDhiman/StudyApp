import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { getCatalogPageData } from '../services/operations/pageComponentData';
import CourseSlider from '../components/core/CatalogPage/CourseSlider';
import CourseCard from '../components/core/CatalogPage/CourseCard';
import Footer from '../components/common/Footer'

const tab = [
  {
    id: 1,
    title: "New",
  },
  {
    id: 2,
    title: "Most popular"
  }
]

const Catalog = () => {

  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [currentTab, setCurrentTab] = useState("New");

  useEffect(() => {

    const fetchCategories = async () => {
      const result = await apiConnector('GET', categories.CATEGORIES_API);
      console.log("categires result os : ", result);
      const category_id = result?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id
      setCategoryId(category_id)
    }

    fetchCategories();

  }, [catalogName])

  useEffect(() => {

    const fetchCategoryPageDetails = async (categoryId) => {
      const result = await getCatalogPageData(categoryId);
      console.log("result is : ", result);
      setCatalogPageData(result);
    }

    if (categoryId) {
      fetchCategoryPageDetails(categoryId);
      console.log(catalogPageData);
    }
  }, [categoryId])

  return (
    <div className="h-full w-[100vw] text-white">
      <div className="bg-richblack-800 p-12 py-16 flex flex-col gap-4">
        <p className="text-richblack-100 text-[14px]">Home / Catalog /<span className="text-[16px] text-yellow-50">{" "}{catalogPageData?.data?.selectedCategory?.name}</span></p>
        <p className="text-richblack-25 text-3xl font-semibold">{catalogPageData?.data?.selectedCategory?.name}</p>
        <p className="text-richblack-100 text-[17px]">{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      {/* course to get started */}

      <div className="p-12">
        <h1 className="text-richblack-25 text-4xl font-bold ">Courses to get you started</h1>
        <div className="border-b-[1px] border-richblack-200 flex gap-3 pt-3 ">
          {
            tab.map((item) => (
              <div key={item.id} className={`${item.title === currentTab ? "text-yellow-50 border-b-[1px] border-yellow-50" : "text-richblack-200"} p-2 cursor-pointer `}
                onClick={() => setCurrentTab(item.title)}>{item.title}</div>
            ))
          }
        </div>
        <div className="py-10">
          <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
        </div>
      </div>

      {/* differnet category */}

      <div className="p-12">
        <p className="text-richblack-25 text-4xl font-bold mb-12">Top courses in {catalogPageData?.data?.selectedCategory?.name}</p>
        <div>
          <CourseSlider
            courses={catalogPageData?.data?.mostSellingCourses}
          />
        </div>
      </div>
      
      {/* most selling */}

      <div className="p-12">
        <p className="text-richblack-25 text-4xl font-bold mb-12">Top courses in {catalogPageData?.data?.selectedCategory?.name}</p>
        <div className="grid grid-cols-3 gap-16">
        {
          catalogPageData?.data?.mostSellingCourses.map((course,index)=>(
            <CourseCard key={index} course={course} Height={"h-[250px]"}></CourseCard>
          ))
        }
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Catalog
