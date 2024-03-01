import React from 'react'

const TableSR = () => {
  return (
    <div>
      <table className='translate-x-[-1px] w-[330px]  h-[130px]'>
        <thead>
          <tr className='text-[12px] font-bold text-center'>
            <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2'>Hỗ trợ</td>
            <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2 w-[101px]'>Giá (VNĐ)</td>
            <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2 '>Kháng cự</td>
            <td className='bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2 w-[100px]'>Giá (VNĐ)</td>
          </tr>
        </thead>
        <tbody>
          <tr className='text-center text-[13px] font-semibold'>
            <td>S1</td>
            <td>10000</td>
            <td>R1</td>
            <td>10000</td>
          </tr>
          <tr className='text-center'>
            <td>S1</td>
            <td>10000</td>
            <td>R1</td>
            <td>10000</td>
          </tr>
          <tr className='text-center'>
            <td>S1</td>
            <td>10000</td>
            <td>R1</td>
            <td>10000</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default TableSR