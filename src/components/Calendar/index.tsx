import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '../../utils/get-week-days'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }
  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const dayInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFieldArray = Array.from({ length: firstWeekDay })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    return [...previousMonthFieldArray, ...dayInMonthArray]
  }, [currentDate])

  console.log(calendarWeeks)

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>4</CalendarDay>
            </td>
            <td>
              <CalendarDay>5</CalendarDay>
            </td>
            <td>
              <CalendarDay>6</CalendarDay>
            </td>
            <td>
              <CalendarDay>7</CalendarDay>
            </td>
            <td>
              <CalendarDay>8</CalendarDay>
            </td>
            <td>
              <CalendarDay>9</CalendarDay>
            </td>
            <td>
              <CalendarDay>10</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>11</CalendarDay>
            </td>
            <td>
              <CalendarDay>12</CalendarDay>
            </td>
            <td>
              <CalendarDay>13</CalendarDay>
            </td>
            <td>
              <CalendarDay>14</CalendarDay>
            </td>
            <td>
              <CalendarDay>15</CalendarDay>
            </td>
            <td>
              <CalendarDay>16</CalendarDay>
            </td>
            <td>
              <CalendarDay>17</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>18</CalendarDay>
            </td>
            <td>
              <CalendarDay>19</CalendarDay>
            </td>
            <td>
              <CalendarDay>20</CalendarDay>
            </td>
            <td>
              <CalendarDay>21</CalendarDay>
            </td>
            <td>
              <CalendarDay>22</CalendarDay>
            </td>
            <td>
              <CalendarDay>23</CalendarDay>
            </td>
            <td>
              <CalendarDay>24</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>25</CalendarDay>
            </td>
            <td>
              <CalendarDay>26</CalendarDay>
            </td>
            <td>
              <CalendarDay>27</CalendarDay>
            </td>
            <td>
              <CalendarDay>28</CalendarDay>
            </td>
            <td>
              <CalendarDay>29</CalendarDay>
            </td>
            <td>
              <CalendarDay>30</CalendarDay>
            </td>
            <td>
              <CalendarDay>31</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
