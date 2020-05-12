export const setStatistic = (values) => window.localStorage.setItem('statistic', JSON.stringify(values))

export const getStatistic = () => {
    try {
        return JSON.parse(window.localStorage.getItem('statistic'))
    } catch {
        return []
    }
}

