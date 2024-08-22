import { Loader, Placeholder } from 'rsuite';
export default function Loading() {
    return <>
        <div className='text-center'>
            <Placeholder.Paragraph rows={8} />
            <Loader backdrop content="loading..." vertical />
        </div>
    </>
}
