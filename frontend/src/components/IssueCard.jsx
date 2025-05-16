// components/IssueCard.jsx
const IssueCard = ({ issue, sender, onMarkDone }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h2 className="text-lg font-bold mb-3">{issue.title ?? 'No Title'}</h2>

          <div className="flex justify-end gap-2 mb-1">
            <span className="px-3 py-1 bg-blue-100 text-sm text-black rounded-full border border-blue-300">
              {issue.issueCategory ?? 'N/A'}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-sm text-black rounded-full border border-blue-300">
              {issue?.rentalId ?? 'N.A'}
            </span>
          </div>

          <div className="flex justify-end gap-2 mb-2">
            <span className="text-sm text-gray-500">
              {new Date(issue.createdDate).toISOString().split('T')[0]}
            </span>
          </div>

          <p className="text-gray-500 mb-2">{issue.issueContent ?? 'No content'}</p>

          <div className="text-sm text-gray-700">
            <p>Sender: {sender ? sender.name : 'Visitor'}</p>
            <p>Email: {sender?.email ?? 'N/A'}</p>
            <p>Tel: {sender?.phoneNumber ?? 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={() => onMarkDone(issue._id)}
          disabled={issue.issueStatus === 'completed'}
          className={`px-6 py-2 rounded ${
            issue.issueStatus === 'completed'
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {issue.issueStatus === 'completed' ? 'Done' : 'Mark Done'}
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
