function billApp() {
    return {
        isFinalizing: false,
        searchNumber: '',
        isSaving: false,
        showHistory: false,
        showSettings: false,
        showDashboard: false,
        dashboardStats: {
            monthlyRevenue: 0,
            annualRevenue: 0,
            outstanding: 0,
            collected: 0,
            topCustomers: [],
            conversion: { quotes: 0, invoices: 0, rate: 0 },
            docsByType: {},
            activeTab: 'Tax Invoice'
        },
        complianceStats: {
            score: 85,
            punctuality: 90,
            itcEfficiency: 75,
            dataIntegrity: 95
        },
        ledgerControls: {
            search: '',
            startDate: '',
            endDate: ''
        },
        savedDocs: [],
        showGstDashboard: false,
        gstView: 'returns', // 'returns', 'calendar', 'reports'
        gstReturns: {
            gstr1: { status: 'Draft', period: '' },
            gstr3b: { status: 'Draft', period: '' }
        },
        gstHistory: [],
        showGstr1Details: false,
        showGstr3bPortal: false,
        lastGstr1Result: null,
        lastGstr3bResult: null,
        selectedGstReturn: null,
        viewDoc: null,
        showCustomerManager: false,
        customerSearch: '',
        viewDoc: null,
        showCustomerManager: false,
        customerSearch: '',
        showProductManager: false,
        productSearch: '',
        prodForm: {
            id: null,
            desc: '',
            hsn: '',
            rate: 0,
            taxRate: 18
        },
        custForm: {
            id: null,
            name: '',
            address: '',
            gstin: '',
            state: '',
            pan: ''
        },
        gstSettings: {
            taxpayerType: 'Regular', // 'Regular', 'Composition', 'TDS/TCS'
            filingFrequency: 'Monthly', // 'Monthly', 'Quarterly'
            businessCategory: 'Service Provider', // 'Service Provider', 'Trader', 'Manufacturer'
            gstin: '',
            state: 'Telangana',
            stateCode: '36'
        },
        gstReturnTypes: [
            {
                code: 'GSTR-1',
                name: 'GSTR-1',
                description: 'Details of outward supplies (Sales)',
                applicableTo: ['Regular'],
                frequencies: ['Monthly', 'Quarterly'],
                dueDayMonthly: 11,
                dueDayQuarterly: 13
            },
            {
                code: 'GSTR-3B',
                name: 'GSTR-3B',
                description: 'Summary return & tax payment',
                applicableTo: ['Regular'],
                frequencies: ['Monthly', 'Quarterly'],
                dueDayMonthly: 20,
                dueDayQuarterly: { Q1: 22, Q2: 22, Q3: 24, Q4: 24 }
            },
            {
                code: 'CMP-08',
                name: 'CMP-08',
                description: 'Self-assessed tax for Composition dealers',
                applicableTo: ['Composition'],
                frequencies: ['Quarterly'],
                dueDayQuarterly: 18
            },
            {
                code: 'GSTR-9',
                name: 'GSTR-9',
                description: 'Annual return for regular taxpayers',
                applicableTo: ['Regular'],
                frequencies: ['Annual'],
                dueDateAnnual: { month: 12, day: 31 } // 31st December of following FY
            }
        ],
        gstFilings: [], // Will store filing records from Supabase

        // Auth State
        user: null,
        profile: null,
        authEmail: '',
        authPassword: '',
        authName: '',
        isLogin: true,
        authLoading: false,

        doc: {
            settings: {
                showSignature: true,
                showCompanyStamp: true,
                showRevenueStamp: true
            },
            company: {
                name: 'LaGa Systems Pvt Ltd',
                tagline: 'House of Scientific Softwares',
                address1: '3rd Floor, Plot No.: 246, Above Central Bank of India',
                address2: 'Road No.:78, Jubilee Hills, Hyderabad 500 033 India',
                cin: 'U72200TG2007PTC053444',
                phone: '+91 40 23549924/8905',
                website: 'www.lagasys.com',
                email: 'info@lagasys.com',
                udyam: 'UDYAM-TS-02-0010670',
                gstin: '36AABCL2941H1ZN',
                pan: 'AABCL2941H'
            },
            revision: 0,
            type: 'Quotation',
            customTitle: '',
            number: '', // Set in init
            currency: 'INR',
            exchangeRate: 1,
            exportType: 'Taxable', // 'Taxable' or 'LUT'
            date: new Date().toISOString().split('T')[0],
            validityDate: '',
            paymentTerms: '100% Advance',
            deliveryTime: '2-3 Working Days',
            deliveryMode: 'Courier / By Hand',
            subject: 'AERMOD View AMC for One Year',
            reference: 'To your email enquiry Dated 03rd April 2025',
            challanNo: '',
            challanDate: '',
            transport: '',
            vehicleNo: '',
            vehicleNo: '',
            poNumber: '',
            poDate: '',
            dueDate: '',
            // Credit/Debit Note specific
            originalInvoiceNo: '',
            originalInvoiceDate: '',
            reasonForIssue: '',
            customer: {
                name: 'LaGa Systems Pvt Ltd',
                address: 'Plot No 246, Road No 78, Jubilee Hills, Hyderabad - 500033',
                gstin: '36AABCL2941H1ZN',
                state: 'Telangana',
                pan: ''
            },
            items: [
                { desc: 'AERMOD View AMC for One Year', hsn: '997331', qty: 1, rate: 72000, discount: 0, taxRate: 18 }
            ],
            bank: {
                name: 'LAGA SYSTEMS PVT LTD',
                bankName: 'Axis Bank',
                branch: 'Hyderabad Main Branch (Begumpet)',
                acc: '008010200057114',
                ifsc: 'UTIB0000008'
            },
            banks: {
                INR: {
                    name: 'LAGA SYSTEMS PVT LTD',
                    bankName: 'Axis Bank',
                    branch: 'Hyderabad Main Branch (Begumpet)',
                    acc: '008010200057114',
                    ifsc: 'UTIB0000008'
                },
                USD: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample USD Bank', branch: 'NY Branch', acc: '', ifsc: '' },
                EUR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample EUR Bank', branch: 'Frankfurt Branch', acc: '', ifsc: '' }
            },
            bankChargesAmount: 0,
            bankChargesEditable: true,
            tnc: [
                'Subject to Hyderabad Jurisdiction.',
                'The software is warranted for any design defects as per specification for 1 Year from the date of supply. During the warranty period you will get free upgrades or Technical Support.',
                'The above price doesn\'t include Installation and Training.'
            ],
            taxRate: 18
        },

        currencies: [
            { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN' },
            { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US' },
            { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE' }
        ],

        masterData: {
            customers: [],
            products: []
        },

        globalBanks: {
            USD: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample USD Bank', branch: 'NY Branch', acc: '', ifsc: '' },
            EUR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample EUR Bank', branch: 'Frankfurt Branch', acc: '', ifsc: '' }
        },

        allowedTaxSlabs: [0, 5, 18, 40],

        async init() {
            lucide.createIcons();
            this.showGstHistoryDetail = false; // Force close on load
            console.log('App Init: Checking Auth Session...');

            // Listen for Auth changes
            window.supabase.auth.onAuthStateChange(async (event, session) => {
                console.log('Auth Event:', event);
                if (session) {
                    this.user = session.user;
                    await this.fetchProfile();
                } else {
                    this.user = null;
                    this.profile = null;
                }
                this.$nextTick(() => lucide.createIcons());
            });

            // Initial session check
            const { data: { session } } = await window.supabase.auth.getSession();
            if (session) {
                this.user = session.user;
                await this.fetchProfile();
            } else {
                console.log('No active session found.');
            }

            await this.loadCustomers();
            await this.loadProducts();
            await this.loadGlobalBanks();
            await this.loadCurrentDoc();
            await this.loadHistory();
            await this.loadGstReturns();
            await this.loadGstFilings();

            if (!this.doc.number) {
                this.doc.number = this.getPreviewNumber(this.doc.type);
            }

            this.$watch('doc.date', (newDate) => {
                if (this.doc.number.includes('PREVIEW')) {
                    this.doc.number = this.getPreviewNumber(this.doc.type);
                }
            });

            this.$watch('doc', () => {
                this.saveCurrentDoc();
            }, { deep: true });
        },

        // --- Auth Methods ---
        async signUp() {
            try {
                this.authLoading = true;
                const { data, error } = await window.supabase.auth.signUp({
                    email: this.authEmail,
                    password: this.authPassword,
                    options: {
                        data: {
                            full_name: this.authName
                        }
                    }
                });
                if (error) throw error;
                // Since email confirmation is disabled in Supabase, the session will be established immediately
            } catch (err) {
                alert(err.message);
            } finally {
                this.authLoading = false;
            }
        },

        async signIn() {
            try {
                this.authLoading = true;
                const { data, error } = await window.supabase.auth.signInWithPassword({
                    email: this.authEmail,
                    password: this.authPassword
                });
                if (error) throw error;
            } catch (err) {
                alert(err.message);
            } finally {
                this.authLoading = false;
            }
        },

        async signOut() {
            console.log('Sign Out Initiated...');
            try {
                await window.supabase.auth.signOut();
            } catch (err) {
                console.error('Supabase SignOut Error:', err);
            }
            this.forceLogout();
        },

        forceLogout() {
            console.log('Forcing local state cleanup...');
            this.user = null;
            this.profile = null;

            // Collect all Supabase related keys first
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.includes('supabase.auth.token') || key.startsWith('sb-'))) {
                    keysToRemove.push(key);
                }
            }

            // Remove them thoroughly
            keysToRemove.forEach(k => {
                console.log('Removing:', k);
                localStorage.removeItem(k);
            });

            // Clear current_doc draft as well to be safe
            localStorage.removeItem('current_doc');
            sessionStorage.clear();

            console.log('Cleanup complete. Reloading page...');
            location.reload();
        },

        async fetchProfile(retryCount = 0) {
            if (!this.user) return;
            console.log(`[Auth] Fetching Profile (Attempt ${retryCount + 1}) for:`, this.user.email);

            // EMERGENCY FALLBACK: If email is in admin list, set temporary role so UI works while fetching
            const adminEmails = ['sunkar@lagasys.com', 'vvssunkar@lagasys.com', 'sankar@lagasys.com'];
            if (!this.profile && adminEmails.includes(this.user.email)) {
                console.log('[Auth] Admin email detected. Setting emergency fallback role.');
                this.profile = { full_name: this.user.user_metadata?.full_name || 'Admin User', role: 'admin' };
            }

            try {
                // Timeout wrapper for Supabase call
                const fetchWithTimeout = () => {
                    return new Promise(async (resolve, reject) => {
                        const timeout = setTimeout(() => reject(new Error('Supabase Request Timeout')), 8000);
                        try {
                            const result = await window.supabase
                                .from('profiles')
                                .select('*')
                                .eq('id', this.user.id)
                                .single();
                            clearTimeout(timeout);
                            resolve(result);
                        } catch (e) {
                            clearTimeout(timeout);
                            reject(e);
                        }
                    });
                };

                const { data, error } = await fetchWithTimeout();

                if (error) {
                    console.warn('[Auth] Profile Fetch Error:', error.message);
                    if (error.code === 'PGRST116') {
                        console.log('[Auth] Profile missing. Attempting self-healing insert...');
                        const { data: newProfile, error: createError } = await window.supabase
                            .from('profiles')
                            .insert([{
                                id: this.user.id,
                                full_name: this.user.user_metadata?.full_name || 'Staff User',
                                role: adminEmails.includes(this.user.email) ? 'admin' : 'sales'
                            }])
                            .select()
                            .single();

                        if (!createError && newProfile) {
                            console.log('[Auth] Self-healing success. Role:', newProfile.role);
                            this.profile = { ...newProfile };
                        } else if (retryCount < 2) {
                            setTimeout(() => this.fetchProfile(retryCount + 1), 2000);
                        }
                    } else if (retryCount < 2) {
                        setTimeout(() => this.fetchProfile(retryCount + 1), 2000);
                    }
                } else if (data) {
                    console.log('[Auth] Profile Found. Role:', data.role);
                    this.profile = { ...data };
                }
            } catch (err) {
                console.error('[Auth] Fetch Exception:', err.message);
                if (retryCount < 2) setTimeout(() => this.fetchProfile(retryCount + 1), 2000);
            }

            this.$nextTick(() => {
                lucide.createIcons();
                console.log('[Auth] Initialization Complete. Current Identity:', this.profile?.full_name, `(${this.profile?.role})`);
            });
        },

        // --- Helper for Role Checks ---
        hasRole(roles) {
            if (!this.profile) return false;
            if (Array.isArray(roles)) return roles.includes(this.profile.role);
            return this.profile.role === roles;
        },

        isSales() { return this.profile?.role === 'sales'; },
        isAdmin() { return this.profile?.role === 'admin'; },
        isAccountant() { return this.profile?.role === 'accountant'; },
        isManager() { return this.profile?.role === 'manager'; },

        normalizeTaxRate(val) {
            const slabs = (this.allowedTaxSlabs || [0, 5, 18, 40]).map(Number);
            let n = Number(val);
            if (!isFinite(n)) return 18;
            return slabs.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a));
        },

        addItem() {
            this.doc.items.push({ desc: '', hsn: '', qty: 1, rate: 0, discount: 0, taxRate: this.normalizeTaxRate(this.doc.taxRate || 18) });
            this.$nextTick(() => lucide.createIcons());
        },

        removeItem(index) {
            this.doc.items.splice(index, 1);
        },

        addTnc() {
            this.doc.tnc.push('');
        },

        removeTnc(index) {
            this.doc.tnc.splice(index, 1);
        },

        selectCustomerObj(c) {
            this.doc.customer = { ...c };
        },

        selectProductObj(index, p) {
            this.doc.items[index].desc = p.desc;
            this.doc.items[index].hsn = p.hsn;
            this.doc.items[index].rate = p.rate;
            this.doc.items[index].taxRate = this.normalizeTaxRate((p.taxRate !== undefined) ? p.taxRate : (this.doc.taxRate || 18));
        },

        async setDocType(type) {
            this.doc.type = type;
            this.doc.customTitle = '';
            this.doc.tnc = (type === 'Delivery Challan')
                ? ['Subject to Hyderabad Jurisdiction.']
                : (type === 'Credit Note' || type === 'Debit Note')
                    ? ['Subject to Hyderabad Jurisdiction.', 'Note being issued as per GST requirements.']
                    : (type === 'Purchase Invoice')
                        ? ['Subject to Hyderabad Jurisdiction.', 'Input Tax Credit to be claimed as per GST rules.']
                        : [
                            'Subject to Hyderabad Jurisdiction.',
                            'The software is warranted for any design defects as per specification for 1 Year.',
                            'The above price doesn\'t include Installation and Training.'
                        ];
            this.doc.number = this.getPreviewNumber(type);
            await this.saveCurrentDoc();
        },

        getDocPrefix(type) {
            if (type === 'Quotation') return 'LGS-QTN';
            if (type === 'Proforma Invoice') return 'LGS-PI';
            if (type === 'Tax Invoice') return 'LGS-TI';
            if (type === 'Delivery Challan') return 'LGS-DC';
            if (type === 'Credit Note') return 'LGS-CN';
            if (type === 'Debit Note') return 'LGS-DN';
            return 'LGS-DOC';
        },

        getDocCode(type) {
            if (type === 'Quotation') return 'QTN';
            if (type === 'Proforma Invoice') return 'PI';
            if (type === 'Tax Invoice') return 'TI';
            if (type === 'Delivery Challan') return 'DC';
            if (type === 'Credit Note') return 'CN';
            if (type === 'Debit Note') return 'DN';
            return 'DOC';
        },

        getCurrentFY(dateStr) {
            const date = dateStr ? new Date(dateStr) : new Date();
            const year = date.getFullYear();
            const month = date.getMonth(); // 0-indexed (0=Jan, 3=April)

            let startYear, endYear;
            if (month >= 3) { // April to Dec
                startYear = year;
                endYear = (year + 1).toString().slice(-2);
            } else { // Jan to March
                startYear = year - 1;
                endYear = year.toString().slice(-2);
            }
            return `${startYear}-${endYear}`;
        },

        getPreviewNumber(type) {
            const fy = this.getCurrentFY(this.doc.date);
            const prefix = this.getDocPrefix(type);
            let num = `${prefix}-${fy}-PREVIEW`;
            if (type === 'Quotation' && this.doc.revision > 0) {
                num += `-R${this.doc.revision}`;
            }
            return num;
        },

        async saveToMaster(type) {
            if (type === 'customer') {
                await this.saveCustomerToDB();
                alert('Customer saved to database!');
            }
            if (type === 'product') {
                await this.saveProductsToDB();
                alert('Products saved to database!');
            }
        },

        async saveCustomerToDB() {
            await window.supabase.from('customers').upsert({
                name: this.doc.customer.name,
                address: this.doc.customer.address,
                gstin: this.doc.customer.gstin,
                state: this.doc.customer.state,
                pan: this.doc.customer.pan
            });
        },

        async loadCustomers() {
            const { data } = await window.supabase
                .from('customers')
                .select('*')
                .order('name');
            if (data) this.masterData.customers = data;
        },

        async saveProductsToDB() {
            for (const item of this.doc.items) {
                if (!item.desc) continue;
                await window.supabase.from('products').upsert({
                    desc: item.desc,
                    hsn: item.hsn,
                    rate: item.rate,
                    tax_rate: item.taxRate
                });
            }
        },

        async loadProducts() {
            const { data } = await window.supabase
                .from('products')
                .select('*')
                .order('desc');
            if (data) {
                this.masterData.products = data.map(p => ({
                    id: p.id,
                    desc: p.desc,
                    hsn: p.hsn,
                    rate: p.rate,
                    taxRate: p.tax_rate
                }));
            }
        },

        // --- Product Master Management ---
        openProductManager() {
            this.showProductManager = true;
            this.resetProductForm();
        },

        resetProductForm() {
            this.prodForm = { id: null, desc: '', hsn: '', rate: 0, taxRate: 18 };
        },

        editProduct(product) {
            this.prodForm = { ...product };
        },

        async saveProductForm() {
            if (!this.prodForm.desc) {
                alert('Product Description is required');
                return;
            }

            const payload = {
                desc: this.prodForm.desc,
                hsn: this.prodForm.hsn,
                rate: this.prodForm.rate,
                tax_rate: this.prodForm.taxRate
            };

            if (this.prodForm.id) {
                payload.id = this.prodForm.id;
            }

            let query = window.supabase.from('products');
            const { error } = await query.upsert(payload);

            if (error) {
                console.error('Save Product Error:', error);
                alert('Failed to save product: ' + error.message);
                return;
            }

            alert('Product saved successfully!');
            this.resetProductForm();
            await this.loadProducts();
        },

        async deleteProduct(id) {
            if (!confirm('Are you sure you want to delete this product?')) return;

            const { error } = await window.supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) {
                alert('Failed to delete: ' + error.message);
            } else {
                await this.loadProducts();
            }
        },

        // --- Customer Master Management ---
        openCustomerManager() {
            this.showCustomerManager = true;
            this.resetCustomerForm();
        },

        resetCustomerForm() {
            this.custForm = { id: null, name: '', address: '', gstin: '', state: '', pan: '' };
        },

        editCustomer(customer) {
            this.custForm = { ...customer };
        },

        async saveCustomerForm() {
            if (!this.custForm.name) {
                alert('Customer Name is required');
                return;
            }

            const payload = {
                name: this.custForm.name,
                address: this.custForm.address,
                gstin: this.custForm.gstin,
                state: this.custForm.state,
                pan: this.custForm.pan
            };

            if (this.custForm.id) {
                payload.id = this.custForm.id;
            }

            // Using upsert based on ID if present, else name might cause conflict if unique, 
            // but assuming ID is the safe bet for updates.
            // If ID is null, we want insert. If name conflict, we might want update or error.
            // For now, let's rely on upsert. If we have UUIDs, upsert works well.
            // If table uses serial ID, we shouldn't send ID on insert.

            let query = window.supabase.from('customers');

            // If we have an ID, we are likely updating precise record. 
            // If not, we are inserting.
            const { error } = await query.upsert(payload);

            if (error) {
                console.error('Save Customer Error:', error);
                alert('Failed to save customer: ' + error.message);
                return;
            }

            alert('Customer saved successfully!');
            this.resetCustomerForm();
            await this.loadCustomers(); // Reload list
        },

        async deleteCustomer(id) {
            if (!confirm('Are you sure you want to delete this customer?')) return;

            const { error } = await window.supabase
                .from('customers')
                .delete()
                .eq('id', id);

            if (error) {
                alert('Failed to delete: ' + error.message);
            } else {
                await this.loadCustomers();
            }
        },

        async loadDocumentByNumber() {
            if (!this.searchNumber) {
                alert('Please enter a document number');
                return;
            }
            const { data, error } = await window.supabase
                .from('documents')
                .select('*')
                .eq('number', this.searchNumber)
                .single();
            if (error || !data) {
                alert('Document not found');
                return;
            }
            this.doc = { ...this.doc, ...data };
            this.searchNumber = '';
            alert(`Loaded ${data.status} document`);
        },

        async saveGlobalBanks() {
            await window.supabase.from('global_banks').upsert({
                key: 'default',
                data: {
                    globalBanks: this.globalBanks,
                    companyDetails: this.doc.company,
                    gstSettings: this.gstSettings
                },
                updated_at: new Date()
            });
            alert('Settings saved');
        },

        async loadGlobalBanks() {
            const { data, error } = await window.supabase
                .from('global_banks')
                .select('data')
                .eq('key', 'default')
                .single();
            if (data && data.data) {
                if (data.data.globalBanks) this.globalBanks = data.data.globalBanks;
                if (data.data.companyDetails) this.doc.company = data.data.companyDetails;
                if (data.data.gstSettings) this.gstSettings = data.data.gstSettings;
            }
        },

        resetGlobalBanks() {
            if (!confirm('Reset global bank defaults to sample values?')) return;
            this.globalBanks = {
                USD: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample USD Bank', branch: 'NY Branch', acc: '', ifsc: '' },
                EUR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample EUR Bank', branch: 'Frankfurt Branch', acc: '', ifsc: '' }
            };
            this.saveGlobalBanks();
        },

        async saveCurrentDoc() {
            if (!this.user) return;
            await window.supabase.from('current_doc').upsert({
                id: this.user.id,
                data: this.doc,
                updated_at: new Date()
            });
        },

        async saveDocToHistory() {
            if (!this.doc.number) {
                alert('Please generate document number first');
                return;
            }
            const payload = {
                type: this.doc.type,
                number: this.doc.number,
                revision: this.doc.revision || 0,
                date: this.doc.date,
                currency: this.doc.currency,
                customer: this.doc.customer,
                items: this.doc.items,
                banks: this.doc.banks,
                totals: {
                    subtotal: this.subTotal(),
                    tax: this.taxAmount(),
                    total: this.grandTotal()
                },
                tnc: this.doc.tnc,
                settings: this.doc.settings,
                status: 'DRAFT',
                created_by: this.user?.id
            };
            const { error } = await window.supabase
                .from('documents')
                .upsert(payload, { onConflict: 'number' });
            if (error) {
                alert('Draft save failed: ' + error.message);
                return;
            }
            alert('Draft saved (temporary)');
            await this.loadHistory(); // Reload to refresh dashboard
        },

        async loadHistory() {
            const { data, error } = await window.supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error) {
                this.savedDocs = data;
                this.updateExecutiveStats();
            }
        },

        async toggleDocStatus(doc) {
            const newStatus = doc.status === 'PAID' ? 'UNPAID' : 'PAID';

            // Optimistic update
            doc.status = newStatus;

            const { error } = await window.supabase
                .from('documents')
                .update({ status: newStatus })
                .eq('id', doc.id);

            if (error) {
                console.error('Error updating status:', error);
                // Revert on error
                doc.status = newStatus === 'PAID' ? 'UNPAID' : 'PAID';
                alert('Failed to update status');
            } else {
                // Update stats if needed
                this.updateExecutiveStats();
            }
        },

        loadHistoryDoc(index) {
            if (confirm('Load this document? Unsaved changes in current document will be lost.')) {
                const saved = JSON.parse(JSON.stringify(this.savedDocs[index]));
                this.doc = {
                    ...this.doc,
                    ...saved,
                    revision: saved.revision || 0
                };
                this.showHistory = false;
                this.saveCurrentDoc();
            }
        },

        async deleteHistoryDoc(index) {
            const doc = this.savedDocs[index];
            if (confirm(`Are you sure you want to delete ${doc.number}?`)) {
                const { error } = await window.supabase
                    .from('documents')
                    .delete()
                    .eq('number', doc.number);
                if (!error) {
                    this.savedDocs.splice(index, 1);
                } else {
                    alert('Delete failed');
                }
            }
        },

        async loadCurrentDoc() {
            if (!this.user) return;
            const { data } = await window.supabase
                .from('current_doc')
                .select('data')
                .eq('id', this.user.id)
                .single();
            if (data && data.data) {
                this.doc = data.data;
                if (this.doc.revision === undefined) this.doc.revision = 0;
            }
        },

        resetDoc() {
            if (confirm('Are you sure you want to clear this document and start fresh?')) {
                this.doc.settings = { showSignature: true, showCompanyStamp: true, showRevenueStamp: true };
                this.doc.revision = 0;
                this.doc.date = new Date().toISOString().split('T')[0];
                this.doc.validityDate = '';
                this.doc.paymentTerms = '';
                this.doc.deliveryTime = '';
                this.doc.deliveryMode = '';
                this.doc.subject = '';
                this.doc.reference = '';
                this.doc.poNumber = '';
                this.doc.poDate = '';
                this.doc.dueDate = '';
                this.doc.originalInvoiceNo = '';
                this.doc.originalInvoiceDate = '';
                this.doc.reasonForIssue = '';
                this.doc.customer = { name: '', address: '', gstin: '', state: '', pan: '' };
                this.doc.taxRate = 18;
                this.doc.items = [{ desc: '', hsn: '', qty: 1, rate: 0, discount: 0, taxRate: 18 }];
                this.doc.tnc = (this.doc.type === 'Delivery Challan')
                    ? ['Subject to Hyderabad Jurisdiction.']
                    : [
                        'Subject to Hyderabad Jurisdiction.',
                        'The software is warranted for any design defects as per specification for 1 Year from the date of supply.',
                        'The above price doesn\'t include Installation and Training.'
                    ];
                this.saveCurrentDoc();
            }
        },

        itemTaxableValue(item, docType) {
            const currentType = docType || this.doc.type;
            const amount = (Number(item.qty) * Number(item.rate));
            const discountAmt = (currentType === 'Quotation') ? amount * (Number(item.discount || 0) / 100) : 0;
            return amount - discountAmt;
        },

        itemTaxAmount(item, docType) {
            if (this.doc.exportType === 'LUT' && this.doc.currency !== 'INR') return 0;
            const currentType = docType || this.doc.type;
            const ratePercent = Number((item.taxRate !== undefined) ? item.taxRate : (this.doc.taxRate || 18));
            return this.itemTaxableValue(item, currentType) * (ratePercent / 100);
        },

        // Resilient calculation for any doc (used for History/GST)
        getDocTotals(doc) {
            if (doc.totals && doc.totals.subtotal !== undefined) {
                return doc.totals;
            }
            // Fallback: Calculate from items
            const subt = (doc.items || []).reduce((sum, item) => {
                const amount = (Number(item.qty) * Number(item.rate));
                const discountAmt = (doc.type === 'Quotation') ? amount * (Number(item.discount || 0) / 100) : 0;
                return sum + (amount - discountAmt);
            }, 0);
            const tax = (doc.items || []).reduce((sum, item) => {
                if (doc.exportType === 'LUT' && doc.currency !== 'INR') return sum;
                const amount = (Number(item.qty) * Number(item.rate));
                const discountAmt = (doc.type === 'Quotation') ? amount * (Number(item.discount || 0) / 100) : 0;
                const taxable = amount - discountAmt;
                const rate = Number((item.taxRate !== undefined) ? item.taxRate : (doc.taxRate || 18));
                return sum + (taxable * (rate / 100));
            }, 0);
            return { subtotal: subt, tax: tax, total: subt + tax, exchangeRate: doc.exchangeRate || 1 };
        },

        itemTotal(item) {
            return this.itemTaxableValue(item) + this.itemTaxAmount(item);
        },

        hasDiscount() {
            return this.doc.items.some(item => Number(item.discount) > 0);
        },

        subTotal() {
            return this.doc.items.reduce((sum, item) => sum + this.itemTaxableValue(item), 0);
        },

        isInterstate() {
            return this.isIGST(this.doc);
        },

        cgstAmount() {
            if (this.isIGST(this.doc)) return 0;
            return this.doc.items.reduce((sum, item) => sum + (this.itemTaxAmount(item) / 2), 0);
        },

        sgstAmount() {
            if (this.isIGST(this.doc)) return 0;
            return this.doc.items.reduce((sum, item) => sum + (this.itemTaxAmount(item) / 2), 0);
        },

        igstAmount() {
            if (!this.isIGST(this.doc)) return 0;
            return this.doc.items.reduce((sum, item) => sum + this.itemTaxAmount(item), 0);
        },

        taxAmount() {
            return this.cgstAmount() + this.sgstAmount() + this.igstAmount();
        },

        bankChargesValue() {
            return Number(this.doc.bankChargesAmount || 0);
        },

        grandTotalRaw() {
            return this.subTotal() + this.taxAmount() + this.bankChargesValue();
        },

        roundOff() {
            return Math.round(this.grandTotalRaw()) - this.grandTotalRaw();
        },

        grandTotal() {
            return Math.round(this.grandTotalRaw());
        },

        totalQty() {
            return this.doc.items.reduce((sum, item) => sum + Number(item.qty), 0);
        },

        formatCurrency(num) {
            const curr = this.currencies.find(c => c.code === (this.doc.currency || 'INR'));
            const locale = curr ? curr.locale : 'en-IN';
            return Number(num).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },

        getCurrencySymbol() {
            const curr = this.currencies.find(c => c.code === (this.doc.currency || 'INR'));
            return curr ? curr.symbol : '₹';
        },

        bankForCurrency() {
            if (this.doc.currency === 'INR') {
                return this.doc.bank || { name: '', bankName: '', acc: '', branch: '', ifsc: '' };
            }
            if (this.globalBanks && this.globalBanks[this.doc.currency]) {
                return this.globalBanks[this.doc.currency];
            }
            return { name: '', bankName: '', acc: '', branch: '', ifsc: '' };
        },

        formatDate(dateStr) {
            if (!dateStr) return '';
            // Handle ISO timestamps from Supabase
            if (dateStr.includes('T')) {
                const date = new Date(dateStr);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
            const parts = dateStr.split('-');
            if (parts.length !== 3) return dateStr;
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        },

        getAuditStamp() {
            const now = new Date();
            const date = now.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            const time = now.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            const userName = this.profile?.full_name || 'Staff User';
            return `Generated and printed by ${userName} on ${date} at ${time}`;
        },

        formatPercent(p) {
            const n = Number(p);
            if (!isFinite(n)) return '';
            return Number.isInteger(n) ? `${n}%` : `${n.toFixed(2)}%`;
        },

        formatSplitPercent(p) {
            const n = Number(p);
            if (!isFinite(n)) return '';
            const half = n / 2;
            const halfStr = Number.isInteger(half) ? `${half}%` : `${half.toFixed(2)}%`;
            return `${halfStr} + ${halfStr}`;
        },

        summaryTaxRate() {
            if (!Array.isArray(this.doc.items) || this.doc.items.length === 0) return null;
            const rates = Array.from(new Set(this.doc.items.map(i => Number(i.taxRate !== undefined ? i.taxRate : (this.doc.taxRate || 18)))));
            return rates.length === 1 ? rates[0] : null;
        },

        async getNextNumberFromSupabase(type) {
            try {
                const fy = this.getCurrentFY(this.doc.date);
                const docCode = this.getDocCode(type);
                // Extract start year as integer for database compatibility (p_year expects INT)
                const startYear = parseInt(fy.split('-')[0]);

                console.log('Requesting next number for:', { type, docCode, fy, startYear });

                const { data, error } = await window.supabase.rpc('next_document_number', {
                    p_type: docCode,
                    p_year: startYear
                });

                if (error) {
                    console.error('Supabase RPC Error:', error);
                    throw new Error(`Database error: ${error.message}. (Year attempted: ${startYear})`);
                }

                const prefix = this.getDocPrefix(type);
                let num = `${prefix}-${fy}-${String(data).padStart(3, '0')}`;
                if (type === 'Quotation' && this.doc.revision > 0) {
                    num += `-R${this.doc.revision}`;
                }
                return num;
            } catch (err) {
                console.error('Error in getNextNumberFromSupabase:', err);
                throw err;
            }
        },

        async savePDF() {
            try {
                this.isSaving = true;
                let finalNumber = this.doc.number;
                // Only get a new serial number from sequence if current is a preview or empty
                if (finalNumber.includes('PREVIEW') || !finalNumber) {
                    finalNumber = await this.getNextNumberFromSupabase(this.doc.type);
                    this.doc.number = finalNumber;
                }

                console.log('Finalizing document:', finalNumber);

                const payload = {
                    type: this.doc.type,
                    number: finalNumber,
                    revision: this.doc.revision || 0,
                    date: this.doc.date,
                    currency: this.doc.currency,
                    customer: this.doc.customer,
                    items: this.doc.items,
                    banks: this.doc.banks,
                    totals: {
                        subtotal: this.subTotal(),
                        tax: this.taxAmount(),
                        total: this.grandTotal()
                    },
                    tnc: this.doc.tnc,
                    settings: this.doc.settings,
                    status: 'FINAL',
                    created_by: this.user?.id
                };

                const { error: saveError } = await window.supabase.from('documents').insert(payload);
                if (saveError) {
                    console.error('Final save error:', saveError);
                    alert('Permanent save failed: ' + saveError.message);
                    return;
                }

                const element = document.getElementById('document-preview');
                const fileName = finalNumber.replace(/[/\\?%*:|"<>]/g, '_') + '.pdf';
                const oldTitle = document.title;
                document.title = fileName.replace('.pdf', '');

                console.log('Generating PDF:', fileName);
                await html2pdf().set({
                    margin: 0,
                    filename: fileName,
                    image: { type: 'png', quality: 1.0 },
                    html2canvas: { scale: 3, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                }).from(element).save();

                document.title = oldTitle;
                await this.resetDraftOnly();
                await this.loadHistory();
                alert('Document saved and PDF generated successfully!');
            } catch (err) {
                console.error('Save PDF Error:', err);
                alert('Error saving PDF: ' + (err.message || err));
            } finally {
                this.isSaving = false;
            }
        },

        async resetDraftOnly() {
            this.doc.number = '';
            this.doc.customer = { name: '', address: '', gstin: '', state: '', pan: '' };
            this.doc.items = [{ desc: '', hsn: '', qty: 1, rate: 0, discount: 0, taxRate: 18 }];
            this.doc.subject = '';
            this.doc.reference = '';
            this.doc.poNumber = '';
            this.doc.poDate = '';
            this.doc.dueDate = '';
            await this.saveCurrentDoc();
        },

        numberToWords(n, currencyCode = 'INR') {
            if (n < 0) return "Negative " + this.numberToWords(-n, currencyCode);
            const curr = (this.currencies || []).find(c => c.code === (currencyCode || 'INR'));
            let currencyWord = 'RUPEES';
            let subunitWord = 'PAISE';

            if (curr && curr.name) {
                const parts = curr.name.split(' ');
                let last = parts[parts.length - 1].toUpperCase();
                if (!last.endsWith('S')) last = last + 'S';
                currencyWord = last;
                if (currencyCode === 'USD' || currencyCode === 'EUR') subunitWord = 'CENTS';
            }

            const whole = Math.floor(n);
            const fraction = Math.round((n - whole) * 100);

            if (n === 0) return `ZERO ${currencyWord} ONLY`;

            const single = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
            const double = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
            const tens = ["", "TEN", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];

            const formatNum = (num) => {
                let str = "";
                if (num > 99) {
                    str += single[Math.floor(num / 100)] + " HUNDRED ";
                    num %= 100;
                }
                if (num > 19) {
                    str += tens[Math.floor(num / 10)] + " ";
                    num %= 10;
                }
                if (num > 9) {
                    str += double[num - 10] + " ";
                } else if (num > 0) {
                    str += single[num] + " ";
                }
                return str;
            };

            let res = "";
            if (currencyCode === 'INR') {
                const formatIndian = (num, suffix) => {
                    if (num === 0) return "";
                    return formatNum(num) + suffix + " ";
                };
                res += formatIndian(Math.floor(whole / 10000000), "CRORE");
                res += formatIndian(Math.floor((whole / 100000) % 100), "LAKH");
                res += formatIndian(Math.floor((whole / 1000) % 100), "THOUSAND");
                res += formatNum(whole % 1000);
            } else {
                const formatInternational = (num, suffix) => {
                    if (num === 0) return "";
                    return formatNum(num) + suffix + " ";
                };
                res += formatInternational(Math.floor(whole / 1000000), "MILLION");
                res += formatInternational(Math.floor((whole / 1000) % 1000), "THOUSAND");
                res += formatNum(whole % 1000);
            }

            let finalStr = res.trim() + ` ${currencyWord}`;
            if (fraction > 0) {
                finalStr += " AND " + formatNum(fraction).trim() + ` ${subunitWord}`;
            }
            return (finalStr + " ONLY").replace(/\s+/g, ' ');
        },

        openEmailClient() {
            const customerName = this.doc.customer.name || 'Customer';
            const number = this.doc.number || 'Draft';
            const type = this.doc.type;
            const subject = `${type} #${number} from LaGa Systems Pvt Ltd`;
            const total = this.grandTotal();
            const amountStr = this.formatCurrency(total);
            const body =
                `Dear ${customerName},\n\n` +
                `Please find attached the ${type} #${number} dated ${this.doc.date} for ${this.getCurrencySymbol()}${amountStr}.\n\n` +
                `Kindly review and process at your earliest convenience.\n\n` +
                `Regards,\n` +
                `LaGa Systems Pvt Ltd\n` +
                `Hyderabad`;

            window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        },

        async copyEmailDraft() {
            const customerName = this.doc.customer.name || 'Customer';
            const number = this.doc.number || 'Draft';
            const type = this.doc.type;
            const subject = `${type} #${number} from LaGa Systems Pvt Ltd`;
            const total = this.grandTotal();
            const amountStr = this.formatCurrency(total);
            const body =
                `Subject: ${subject}\n\n` +
                `Dear ${customerName},\n\n` +
                `Please find attached the ${type} #${number} dated ${this.doc.date} for ${this.getCurrencySymbol()}${amountStr}.\n\n` +
                `Kindly review and process at your earliest convenience.\n\n` +
                `Regards,\n` +
                `LaGa Systems Pvt Ltd\n` +
                `Hyderabad`;

            try {
                await navigator.clipboard.writeText(body);
                alert('Email draft copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
                alert('Failed to copy to clipboard');
            }
        },

        // Duplicate document feature
        async duplicateDoc(savedDoc) {
            if (confirm(`Duplicate document ${savedDoc.number}?`)) {
                this.doc = JSON.parse(JSON.stringify(savedDoc));
                this.doc.date = new Date().toISOString().split('T')[0];
                this.doc.number = this.getPreviewNumber(this.doc.type);
                this.showHistory = false;
                await this.saveCurrentDoc();
                alert('Document duplicated! Document number reset to preview.');
            }
        },

        applyRevision() {
            if (this.doc.type !== 'Quotation') return;
            let base = this.doc.number.split('-R')[0];
            if (base.includes('PREVIEW')) {
                this.doc.number = this.getPreviewNumber('Quotation');
            } else {
                this.doc.number = (this.doc.revision > 0) ? `${base}-R${this.doc.revision}` : base;
            }
        },

        // --- GST Module Helpers ---
        getGstStateCode(gstin) {
            if (!gstin || gstin.length < 2) return '';
            return gstin.substring(0, 2);
        },

        isB2B(customer) {
            return customer && customer.gstin && customer.gstin.length === 15;
        },

        calculateGstDueDate(type, month, year, frequency) {
            if (type === 'GSTR-1') {
                return frequency === 'Monthly' ? `11th ${month}` : `13th ${month}`;
            }
            if (type === 'GSTR-3B') {
                return '20th';
            }
            if (type === 'CMP-08') {
                return '18th';
            }
            return '';
        },

        getGstDashboardStats() {
            const docs = this.savedDocs.filter(d =>
                d.type === 'Tax Invoice' ||
                d.type === 'Credit Note' ||
                d.type === 'Debit Note'
            );

            let b2bCount = 0;
            let b2cCount = 0;
            let totalTaxable = 0;
            let totalGst = 0;

            docs.forEach(doc => {
                const isB2B = this.isB2B(doc.customer);
                if (isB2B) b2bCount++; else b2cCount++;

                const docStats = this.getDocTotals(doc);
                const exRate = doc.exchangeRate || 1;
                const taxable = docStats.subtotal * exRate;
                const gst = docStats.tax * exRate;

                if (doc.type === 'Credit Note') {
                    totalTaxable -= taxable;
                    totalGst -= gst;
                } else {
                    totalTaxable += taxable;
                    totalGst += gst;
                }
            });

            return { b2bCount, b2cCount, totalTaxable, totalGst };
        },

        updateExecutiveStats() {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            // FY Calculation (April to March)
            let fyStartYear = currentMonth < 3 ? currentYear - 1 : currentYear;

            const newStats = {
                monthlyRevenue: 0,
                annualRevenue: 0,
                outstanding: 0,
                collected: 0,
                topCustomers: [],
                conversion: {
                    quotes: 0,
                    invoices: 0,
                    rate: 0
                },
                docsByType: {
                    'Quotation': [],
                    'Proforma Invoice': [],
                    'Tax Invoice': [],
                    'Delivery Challan': [],
                    'Credit Note': [],
                    'Debit Note': []
                }
            };

            const customerMap = {};

            this.savedDocs.forEach(doc => {
                const docDate = new Date(doc.date);
                const totals = this.getDocTotals(doc);
                const isInvoice = (doc.type === 'Tax Invoice' || doc.type === 'Debit Note');
                const isCreditNote = (doc.type === 'Credit Note');
                const multiplier = isCreditNote ? -1 : 1;

                if (isInvoice || isCreditNote) {
                    const exRate = doc.exchangeRate || 1;
                    // Revenue (Month) - Matches Month AND Year
                    if (docDate.getMonth() === currentMonth && docDate.getFullYear() === currentYear) {
                        newStats.monthlyRevenue += totals.subtotal * multiplier * exRate;
                    }

                    // Revenue (Annual FY) - Starts April 1st
                    const fyStartDate = new Date(fyStartYear, 3, 1);
                    if (docDate >= fyStartDate) {
                        newStats.annualRevenue += totals.subtotal * multiplier * exRate;
                    }

                    // Payment Metrics
                    if (doc.status !== 'PAID') {
                        newStats.outstanding += totals.total * multiplier * exRate;
                    } else {
                        newStats.collected += totals.total * multiplier * exRate;
                    }

                    // Top Customers
                    const cName = doc.customer.name || 'Unknown';
                    if (!customerMap[cName]) customerMap[cName] = 0;
                    customerMap[cName] += totals.subtotal * multiplier;
                }

                if (doc.type === 'Quotation') newStats.conversion.quotes++;
                if (doc.type === 'Tax Invoice') newStats.conversion.invoices++;

                // Document-wise grouping
                if (!newStats.docsByType[doc.type]) {
                    newStats.docsByType[doc.type] = [];
                }
                // Smart Status Logic
                let displayStatus = doc.status || 'UNPAID';
                const now = new Date();

                if (doc.type === 'Tax Invoice' && displayStatus !== 'PAID' && doc.dueDate) {
                    if (new Date(doc.dueDate) < now) displayStatus = 'OVERDUE';
                }

                if (doc.type === 'Quotation' && doc.validityDate) {
                    if (new Date(doc.validityDate) < now) displayStatus = 'EXPIRED';
                }

                newStats.docsByType[doc.type].push({
                    id: doc.id,
                    number: doc.number,
                    customer: doc.customer.name || 'Unknown',
                    date: doc.date,
                    total: totals.total,
                    status: displayStatus,
                    raw: doc // For operations
                });
            });

            // Format Top Customers
            newStats.topCustomers = Object.entries(customerMap)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 5);

            // Calculate Conversion Rate
            if (newStats.conversion.quotes > 0) {
                newStats.conversion.rate = Math.round((newStats.conversion.invoices / newStats.conversion.quotes) * 100);
            }

            this.dashboardStats = newStats;

            // Set active tab if current is invalid
            const types = Object.keys(newStats.docsByType);
            if (types.length > 0 && !types.includes(this.dashboardStats.activeTab)) {
                this.dashboardStats.activeTab = types[0];
            }
        },

        loadDocForView(id) {
            const doc = this.savedDocs.find(d => d.id === id);
            if (doc) {
                this.viewDoc = JSON.parse(JSON.stringify(doc));

                // Calculate Tax Breakdown
                const state = (this.viewDoc.customer.state || '').toLowerCase();
                const isInterstate = !state.includes('telangana');
                const totalTax = this.viewDoc.totals?.tax || 0;

                if (isInterstate) {
                    this.viewDoc.totals.igst = totalTax;
                    this.viewDoc.totals.cgst = 0;
                    this.viewDoc.totals.sgst = 0;
                } else {
                    this.viewDoc.totals.igst = 0;
                    this.viewDoc.totals.cgst = totalTax / 2;
                    this.viewDoc.totals.sgst = totalTax / 2;
                }

                this.showDocViewer = true;
            }
        },

        reviseDoc(id) {
            const doc = this.savedDocs.find(d => d.id === id);
            if (doc) {
                // Load doc as base
                this.doc = JSON.parse(JSON.stringify(doc));

                // Add revision logic
                const originalNo = this.doc.number;
                // Check if already a revision
                const revMatch = originalNo.match(/-Rev(\d+)$/);
                let newRev = 1;
                let baseNo = originalNo;

                if (revMatch) {
                    newRev = parseInt(revMatch[1]) + 1;
                    baseNo = originalNo.replace(/-Rev\d+$/, '');
                }

                this.doc.number = `${baseNo}-Rev${newRev}`;
                this.doc.date = new Date().toISOString().split('T')[0]; // Reset date to today
                delete this.doc.id; // Ensure new ID on save

                this.showDashboard = false;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },

        getFilteredDocs(type) {
            const docs = this.dashboardStats.docsByType[type] || [];
            if (!this.ledgerControls.search && !this.ledgerControls.startDate && !this.ledgerControls.endDate) {
                return docs;
            }

            return docs.filter(doc => {
                // Search Filter
                const searchLower = this.ledgerControls.search.toLowerCase();
                const matchesSearch = !this.ledgerControls.search ||
                    doc.number.toLowerCase().includes(searchLower) ||
                    doc.customer.toLowerCase().includes(searchLower) ||
                    doc.total.toString().includes(searchLower);

                // Date Range Filter
                let matchesDate = true;
                if (this.ledgerControls.startDate) {
                    matchesDate = matchesDate && new Date(doc.date) >= new Date(this.ledgerControls.startDate);
                }
                if (this.ledgerControls.endDate) {
                    matchesDate = matchesDate && new Date(doc.date) <= new Date(this.ledgerControls.endDate);
                }

                return matchesSearch && matchesDate;
            });
        },

        exportLedgerTab(type) {
            const data = this.getFilteredDocs(type).map(doc => ({
                'Date': doc.date,
                'Document No': doc.number,
                'Customer': doc.customer,
                'Status': doc.status,
                'Amount': doc.total
            }));

            if (data.length === 0) {
                alert('No data to export!');
                return;
            }

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Ledger");
            XLSX.writeFile(wb, `${type}_Ledger_Export.xlsx`);
        },

        getGstr1Details() {
            const docs = this.savedDocs.filter(d =>
                d.type === 'Tax Invoice' ||
                d.type === 'Credit Note' ||
                d.type === 'Debit Note'
            );

            const b2b = [];
            const b2cMap = {}; // Key: POS-Rate

            docs.forEach(doc => {
                const multiplier = doc.type === 'Credit Note' ? -1 : 1;
                const isB2B = this.isB2B(doc.customer);
                const pos = isB2B ? doc.customer.gstin.substring(0, 2) : (this.getGstStateCode(doc.customer.gstin) || this.doc.company.gstin.substring(0, 2));

                if (isB2B) {
                    // Group invoice items by rate for B2B
                    const rateGroups = {};
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        if (!rateGroups[r]) rateGroups[r] = { rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const txval = (item.qty * item.rate) * multiplier;
                        const tax = txval * (r / 100);
                        rateGroups[r].txval += txval;
                        if (this.isIGST(doc.customer.gstin)) rateGroups[r].iamt += tax;
                        else {
                            rateGroups[r].camt += tax / 2;
                            rateGroups[r].samt += tax / 2;
                        }
                    });

                    const docStats = this.getDocTotals(doc);
                    b2b.push({
                        number: doc.number,
                        date: doc.date,
                        poNumber: doc.poNumber || '',
                        poDate: doc.poDate || '',
                        name: doc.customer.name,
                        gstin: doc.customer.gstin,
                        pos: pos,
                        itms: Object.values(rateGroups),
                        taxable: docStats.subtotal * multiplier,
                        gst: docStats.tax * multiplier
                    });
                } else {
                    // Aggregate B2C by POS and Rate
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        const key = `${pos}-${r}`;
                        if (!b2cMap[key]) b2cMap[key] = { pos, rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const txval = (item.qty * item.rate) * multiplier;
                        const tax = txval * (r / 100);
                        b2cMap[key].txval += txval;
                        if (pos !== this.doc.company.gstin.substring(0, 2)) b2cMap[key].iamt += tax;
                        else {
                            b2cMap[key].camt += tax / 2;
                            b2cMap[key].samt += tax / 2;
                        }
                    });
                }
            });

            return { b2b, b2c: Object.values(b2cMap) };
        },

        exportGstr1Details() {
            const data = this.getGstr1Details();
            let csv = "Type,Invoice No,Date,Customer PO No,Customer PO Date,Customer Name,GSTIN,Taxable Value,GST Total\n";

            data.b2b.forEach(item => {
                csv += `B2B,${item.number},${item.date},${item.poNumber},${item.poDate},"${item.name}",${item.gstin},${item.taxable},${item.gst}\n`;
            });

            data.b2c.forEach(item => {
                csv += `B2C,${item.number},${item.date},,, "${item.name}",,${item.taxable},${item.gst}\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', `GSTR1_Details_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },

        generateGstr1Json() {
            const details = this.getGstr1Details();
            const hsnSummary = this.getHsnSummary();
            const now = new Date();
            const period = (now.getMonth() + 1).toString().padStart(2, '0') + now.getFullYear();

            const json = {
                gstin: this.doc.company.gstin,
                fp: period,
                cur_gt: 0,
                b2b: details.b2b.map(inv => ({
                    ctin: inv.gstin,
                    inv: [{
                        inum: inv.number,
                        idt: this.formatDate(inv.date),
                        val: inv.taxable + inv.gst,
                        pos: inv.pos,
                        rchrg: "N",
                        inv_typ: "R",
                        itms: inv.itms.map((itm, i) => ({
                            num: i + 1,
                            itm_det: {
                                rt: itm.rt,
                                txval: itm.txval,
                                iamt: itm.iamt,
                                camt: itm.camt,
                                samt: itm.samt,
                                csamt: 0
                            }
                        }))
                    }]
                })),
                b2cs: details.b2c.map(group => ({
                    sply_ty: group.pos === this.doc.company.gstin.substring(0, 2) ? "INTRA" : "INTER",
                    pos: group.pos,
                    typ: "OE",
                    rt: group.rt,
                    txval: group.txval,
                    iamt: group.iamt,
                    camt: group.camt,
                    samt: group.samt,
                    csamt: 0
                })),
                hsn: {
                    data: hsnSummary.map((h, i) => ({
                        num: i + 1,
                        hsn_sc: h.hsn,
                        desc: h.desc,
                        uqc: "NOS",
                        qty: h.qty,
                        val: h.total,
                        txval: h.taxable,
                        iamt: h.iamt,
                        camt: h.camt,
                        samt: h.samt,
                        csamt: 0
                    }))
                }
            };

            const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', `GSTR1_${this.doc.company.gstin}_${period}.json`);
            a.click();
        },

        generateGstr3bJson() {
            const period = new Date().toISOString().slice(0, 7).replace('-', '');
            const portalData = this.getGstr3bPortalData();

            const json = {
                gstin: this.doc.company.gstin,
                fp: period,
                ret_period: period,
                table3_1: {
                    sup_details: {
                        osup_det: {
                            txval: portalData.table31.a.val,
                            iamt: portalData.table31.a.tax,
                            camt: portalData.table31.a.tax / 2,
                            samt: portalData.table31.a.tax / 2,
                            csamt: 0
                        },
                        osup_zero: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        osup_nil_exmp: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        isup_rev: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        osup_nongst: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    }
                },
                table4: {
                    itc_avail: [
                        { ty: "IMPG", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "IMPS", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "ISUP", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "ISD", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "OTH", iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    ],
                    itc_rev: [
                        { ty: "RULE", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "OTH", iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    ],
                    itc_inelg: [
                        { ty: "RULE", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "OTH", iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    ]
                }
            };

            const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', `GSTR3B_${this.doc.company.gstin}_${period}.json`);
            a.click();
        },

        exportGstr1Excel() {
            const period = new Date().toISOString().slice(0, 7);
            const details = this.getGstr1Details();
            const hsn = this.getHsnSummary();

            // Prepare B2B Sheet (Expanding items)
            const b2bData = [];
            details.b2b.forEach(inv => {
                inv.itms.forEach(itm => {
                    b2bData.push({
                        "Invoice Number": inv.number,
                        "Invoice Date": inv.date,
                        "Customer PO No": inv.poNumber || '',
                        "Customer PO Date": inv.poDate || '',
                        "Customer Name": inv.name,
                        "Customer GSTIN": inv.gstin,
                        "Place of Supply": inv.pos,
                        "Rate": itm.rt,
                        "Taxable Value": itm.txval,
                        "IGST": itm.iamt,
                        "CGST": itm.camt,
                        "SGST": itm.samt
                    });
                });
            });

            // Prepare B2CS Sheet (Aggregated)
            const b2csData = details.b2c.map(group => ({
                "Place of Supply": group.pos,
                "Type": group.pos === this.doc.company.gstin.substring(0, 2) ? "Intra-State" : "Inter-State",
                "Rate": group.rt,
                "Taxable Value": group.txval,
                "IGST": group.iamt,
                "CGST": group.camt,
                "SGST": group.samt
            }));

            // Prepare HSN Sheet
            const hsnData = hsn.map(h => ({
                "HSN/SAC": h.hsn,
                "Description": h.desc,
                "UQC": "NOS",
                "Total Quantity": h.qty,
                "Taxable Value": h.taxable,
                "IGST": h.iamt,
                "CGST": h.camt,
                "SGST": h.samt,
                "Total Value": h.total
            }));

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(b2bData), "B2B");
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(b2csData), "B2CS");
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(hsnData), "HSN");

            XLSX.writeFile(wb, `GSTR1_${this.doc.company.gstin}_${period}.xlsx`);
        },

        exportGstr3bExcel() {
            const period = new Date().toISOString().slice(0, 7);
            const portalData = this.getGstr3bPortalData();

            const table31 = [
                { "Nature of Supplies": portalData.table31.a.label, "Taxable Value": portalData.table31.a.val, "IGST": portalData.table31.a.tax, "CGST": portalData.table31.a.tax / 2, "SGST": portalData.table31.a.tax / 2 },
                { "Nature of Supplies": portalData.table31.b.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 },
                { "Nature of Supplies": portalData.table31.c.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 },
                { "Nature of Supplies": portalData.table31.d.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 },
                { "Nature of Supplies": portalData.table31.e.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 }
            ];

            const table4 = [
                { "Details": portalData.table4.a.label, "Total ITC": 0 },
                { "Details": portalData.table4.b.label, "Total ITC": 0 },
                { "Details": portalData.table4.c.label, "Total ITC": 0 },
                { "Details": portalData.table4.d.label, "Total ITC": 0 }
            ];

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(table31), "Table 3.1");
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(table4), "Table 4");

            XLSX.writeFile(wb, `GSTR3B_${this.doc.company.gstin}_${period}.xlsx`);
        },

        getHsnSummary() {
            const hsnMap = {};
            const docs = this.savedDocs.filter(d =>
                d.type === 'Tax Invoice' || d.type === 'Credit Note' || d.type === 'Debit Note'
            );

            docs.forEach(doc => {
                const isCreditNote = doc.type === 'Credit Note';
                const multiplier = isCreditNote ? -1 : 1;
                const isIGST = this.isIGST(doc.customer.gstin);

                doc.items.forEach(item => {
                    if (!item.hsn) return;
                    if (!hsnMap[item.hsn]) {
                        hsnMap[item.hsn] = { hsn: item.hsn, desc: item.desc, qty: 0, taxable: 0, total: 0, iamt: 0, camt: 0, samt: 0 };
                    }
                    const taxable = (item.qty * item.rate) * multiplier;
                    const tax = (taxable * (item.taxRate / 100));

                    hsnMap[item.hsn].qty += (item.qty * multiplier);
                    hsnMap[item.hsn].taxable += taxable;
                    hsnMap[item.hsn].total += (taxable + tax);

                    if (isIGST) hsnMap[item.hsn].iamt += tax;
                    else {
                        hsnMap[item.hsn].camt += tax / 2;
                        hsnMap[item.hsn].samt += tax / 2;
                    }
                });
            });

            return Object.values(hsnMap);
        },

        isIGST(doc) {
            // If it's a doc object (for dashboard/history)
            const targetGstin = doc?.customer?.gstin || doc;
            const isForeign = doc?.currency && doc.currency !== 'INR';
            if (isForeign) return true; // Exports are treated as IGST (Inter-state)
            if (!targetGstin || !this.doc.company.gstin) return false;
            const gstinStr = typeof targetGstin === 'string' ? targetGstin : '';
            return gstinStr.substring(0, 2) !== this.doc.company.gstin.substring(0, 2);
        },

        getGstr3bPortalData() {
            const stats = this.getGstDashboardStats();
            // Simplified logic for GSTR-3B Table-wise layout
            return {
                table31: {
                    a: { label: "Outward Taxable Supplies", val: stats.totalTaxable, tax: stats.totalGst },
                    b: { label: "Outward Taxable Supplies (Zero Rated)", val: 0, tax: 0 },
                    c: { label: "Other Outward Supplies (Nil Rated, Exempted)", val: 0, tax: 0 },
                    d: { label: "Inward Supplies liable to Reverse Charge", val: 0, tax: 0 },
                    e: { label: "Non-GST Outward Supplies", val: 0, tax: 0 }
                },
                table4: {
                    a: { label: "ITC Available (Import of Goods/Services, Reverse Charge, etc.)", val: 0 },
                    b: { label: "ITC Reversed", val: 0 },
                    c: { label: "Net ITC Available", val: 0 },
                    d: { label: "Ineligible ITC", val: 0 }
                }
            };
        },

        async saveGstReturn(type, status) {
            const payload = {
                type: type,
                period: new Date().toISOString().slice(0, 7), // YYYY-MM
                status: status || 'DRAFT',
                data: type === 'GSTR-1' ? { details: this.getGstr1Details(), hsn: this.getHsnSummary() } : this.getGstr3bPortalData(),
                filed_at: status === 'FILED' ? new Date() : null,
                created_by: this.user?.id
            };
            const { error } = await window.supabase.from('gst_returns').upsert(payload);
            if (!error) {
                alert(`${type} saved to persistent registry`);
                await this.loadGstReturns();
            } else console.error('GST Save Error:', error);
        },

        async loadGstReturns() {
            const { data, error } = await window.supabase
                .from('gst_returns')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error) this.gstHistory = data;
        },

        viewGstReturnDetail(rec) {
            this.selectedGstReturn = rec;
            this.showGstHistoryDetail = true;
        },

        // --- GST Compliance Helper Functions ---

        getApplicableReturns() {
            return this.gstReturnTypes.filter(rt =>
                rt.applicableTo.includes(this.gstSettings.taxpayerType)
            );
        },

        isValidGstin(gstin) {
            const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            return regex.test(gstin);
        },

        isValidHsn(hsn) {
            const regex = /^\d{4}(\d{2})?(\d{2})?$/;
            return regex.test(hsn);
        },

        calculateGstDueDate(returnType, period, frequency) {
            const rt = this.gstReturnTypes.find(r => r.code === returnType);
            if (!rt) return null;

            let dueDate;

            if (frequency === 'Monthly') {
                // Period format: '2026-01'
                const [year, month] = period.split('-').map(Number);
                const nextMonth = month === 12 ? 1 : month + 1;
                const nextYear = month === 12 ? year + 1 : year;
                dueDate = new Date(nextYear, nextMonth - 1, rt.dueDayMonthly);
            } else if (frequency === 'Quarterly') {
                // Period format: 'Q1-2026'
                const [q, year] = period.split('-');
                const quarter = q.replace('Q', '');
                const quarterEndMonth = quarter * 3;
                const nextMonth = quarterEndMonth === 12 ? 1 : quarterEndMonth + 1;
                const nextYear = quarterEndMonth === 12 ? parseInt(year) + 1 : parseInt(year);

                let dueDay = rt.dueDayQuarterly;
                if (typeof dueDay === 'object') {
                    dueDay = dueDay[q] || 13;
                }

                dueDate = new Date(nextYear, nextMonth - 1, dueDay);
            } else if (frequency === 'Annual') {
                // Period format: 'FY2025-26'
                const fyYear = parseInt(period.split('-')[0].replace('FY', ''));
                dueDate = new Date(fyYear + 1, rt.dueDateAnnual.month - 1, rt.dueDateAnnual.day);
            }

            return dueDate;
        },

        getGstPeriods(year, frequency) {
            const periods = [];
            if (frequency === 'Monthly') {
                for (let m = 1; m <= 12; m++) {
                    const month = m.toString().padStart(2, '0');
                    periods.push({ value: `${year}-${month}`, label: `${this.getMonthName(m)} ${year}` });
                }
            } else if (frequency === 'Quarterly') {
                for (let q = 1; q <= 4; q++) {
                    periods.push({ value: `Q${q}-${year}`, label: `Q${q} ${year}` });
                }
            } else if (frequency === 'Annual') {
                const fy = `FY${year}-${(year + 1).toString().slice(-2)}`;
                periods.push({ value: fy, label: fy });
            }
            return periods;
        },

        getMonthName(month) {
            const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return names[month - 1];
        },

        async calculateGSTR1(startDate, endDate) {
            // Calculate GSTR-1 from Tax Invoices, Credit Notes, and Debit Notes for the given period
            const docs = this.savedDocs.filter(d =>
                (d.type === 'Tax Invoice' || d.type === 'Credit Note' || d.type === 'Debit Note') &&
                d.date >= startDate &&
                d.date <= endDate
            );

            const b2b = [];
            const b2cMap = {}; // Key: POS-Rate
            const hsnMap = {}; // Key: HSN-Rate
            let totalTaxable = 0;
            let totalGst = 0;

            docs.forEach(doc => {
                const multiplier = doc.type === 'Credit Note' ? -1 : 1;
                const isB2B = doc.customer && doc.customer.gstin;
                const pos = isB2B ? doc.customer.gstin.substring(0, 2) : (this.getGstStateCode(doc.customer.gstin) || this.doc.company.gstin.substring(0, 2));

                const totals = this.getDocTotals(doc);

                // Aggregate HSN Summary (Section 12)
                doc.items.forEach(item => {
                    const hsn = item.hsn || '999999'; // Default HSN
                    const r = Number(item.taxRate || 18);
                    const hsnKey = `${hsn}-${r}`;

                    if (!hsnMap[hsnKey]) {
                        hsnMap[hsnKey] = { hsn, uqc: 'NOS', qty: 0, txval: 0, iamt: 0, camt: 0, samt: 0, rt: r };
                    }

                    const exRate = doc.exchangeRate || 1;
                    const itemTxval = (item.qty * item.rate) * multiplier * exRate;
                    const itemTax = itemTxval * (r / 100);

                    hsnMap[hsnKey].qty += (item.qty * multiplier);
                    hsnMap[hsnKey].txval += itemTxval;

                    if (isB2B && this.isIGST(doc.customer.gstin)) {
                        hsnMap[hsnKey].iamt += itemTax;
                    } else if (isB2B) {
                        hsnMap[hsnKey].camt += itemTax / 2;
                        hsnMap[hsnKey].samt += itemTax / 2;
                    } else {
                        // For B2C, check POS vs Company GSTIN
                        if (pos !== this.doc.company.gstin.substring(0, 2)) {
                            hsnMap[hsnKey].iamt += itemTax;
                        } else {
                            hsnMap[hsnKey].camt += itemTax / 2;
                            hsnMap[hsnKey].samt += itemTax / 2;
                        }
                    }
                });

                if (isB2B) {
                    // Item aggregation for B2B JSON structure compatibility
                    const rateGroups = {};
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        if (!rateGroups[r]) rateGroups[r] = { rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const exRate = doc.exchangeRate || 1;
                        const txval = (item.qty * item.rate) * multiplier * exRate;
                        const tax = txval * (r / 100);
                        rateGroups[r].txval += txval;
                        if (this.isIGST(doc)) rateGroups[r].iamt += tax;
                        else {
                            rateGroups[r].camt += tax / 2;
                            rateGroups[r].samt += tax / 2;
                        }
                    });

                    const itms = Object.values(rateGroups);
                    b2b.push({
                        number: doc.number,
                        date: doc.date,
                        poNumber: doc.poNumber || '',
                        poDate: doc.poDate || '',
                        gstin: doc.customer.gstin,
                        name: doc.customer.name,
                        taxable: (totals.subtotal * multiplier) * (doc.exchangeRate || 1),
                        gst: (totals.tax * multiplier) * (doc.exchangeRate || 1),
                        iamt: itms.reduce((s, i) => s + i.iamt, 0),
                        camt: itms.reduce((s, i) => s + i.camt, 0),
                        samt: itms.reduce((s, i) => s + i.samt, 0),
                        itms: itms
                    });
                } else {
                    // Aggregate B2C by POS and Rate
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        const key = `${pos}-${r}`;
                        if (!b2cMap[key]) b2cMap[key] = { pos, rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const exRate = doc.exchangeRate || 1;
                        const txval = (item.qty * item.rate) * multiplier * exRate;
                        const tax = txval * (r / 100);
                        b2cMap[key].txval += txval;
                        if (pos !== this.doc.company.gstin.substring(0, 2) || (doc.currency && doc.currency !== 'INR')) {
                            b2cMap[key].iamt += tax;
                        } else {
                            b2cMap[key].camt += tax / 2;
                            b2cMap[key].samt += tax / 2;
                        }
                    });
                }

                totalTaxable += (totals.subtotal * multiplier);
                totalGst += (totals.tax * multiplier);
            });

            return {
                b2b,
                b2c: Object.values(b2cMap),
                hsnSummary: Object.values(hsnMap),
                totalTaxable,
                totalGst,
                iamt: b2b.reduce((s, i) => s + i.iamt, 0) + Object.values(b2cMap).reduce((s, i) => s + i.iamt, 0),
                camt: b2b.reduce((s, i) => s + i.camt, 0) + Object.values(b2cMap).reduce((s, i) => s + i.camt, 0),
                samt: b2b.reduce((s, i) => s + i.samt, 0) + Object.values(b2cMap).reduce((s, i) => s + i.samt, 0),
                invoiceCount: docs.length
            };
        },

        async calculateGSTR3B(startDate, endDate) {
            const gstr1Data = await this.calculateGSTR1(startDate, endDate);

            // Fetch Purchase Invoices for ITC
            const purchases = this.savedDocs.filter(d =>
                d.type === 'Purchase Invoice' &&
                d.date >= startDate &&
                d.date <= endDate
            ).map(d => d.raw || d);

            let itcTotal = 0;
            purchases.forEach(p => {
                p.items.forEach(item => {
                    const exRate = p.exchangeRate || 1;
                    itcTotal += (item.qty * item.rate) * (r / 100) * exRate;
                });
            });

            const portalData = {
                table31: {
                    a: { label: "Outward Taxable Supplies", val: gstr1Data.totalTaxable, tax: gstr1Data.totalGst },
                    b: { label: "Outward Taxable Supplies (Zero Rated)", val: 0, tax: 0 },
                    c: { label: "Other Outward Supplies (Nil Rated, Exempted)", val: 0, tax: 0 },
                    d: { label: "Inward Supplies liable to Reverse Charge", val: 0, tax: 0 },
                    e: { label: "Non-GST Outward Supplies", val: 0, tax: 0 }
                },
                table4: {
                    a: { label: "ITC Available (All other ITC)", val: itcTotal },
                    b: { label: "ITC Reversed", val: 0 },
                    c: { label: "Net ITC Available", val: itcTotal },
                    d: { label: "Ineligible ITC", val: 0 }
                }
            };

            return {
                outwardSupplies: {
                    taxableValue: gstr1Data.totalTaxable,
                    igst: gstr1Data.iamt,
                    cgst: gstr1Data.camt,
                    sgst: gstr1Data.samt,
                    cess: 0
                },
                itc: {
                    available: itcTotal,
                    reversed: 0
                },
                netTaxLiability: Math.max(0, gstr1Data.totalGst - itcTotal),
                portalData: portalData
            };
        },

        updateComplianceHealth() {
            // Logic to calculate compliance metrics based on savedDocs and gstHistory
            const totalReturns = this.gstHistory.length;
            if (totalReturns === 0) return;

            // Simplified calculation for demonstration
            const validGstins = this.masterData.customers.filter(c => this.isValidGstin(c.gstin)).length;
            const totalCustomers = this.masterData.customers.length || 1;
            this.complianceStats.dataIntegrity = Math.round((validGstins / totalCustomers) * 100);

            // Score based on integrity and simulated punctuality
            this.complianceStats.score = Math.round((this.complianceStats.dataIntegrity + this.complianceStats.punctuality + this.complianceStats.itcEfficiency) / 3);
        },

        async calculateCMP08(quarter, year) {
            // For composition dealers - simplified calculation
            const [q] = quarter.split('-');
            const quarterNum = parseInt(q.replace('Q', ''));
            const startMonth = (quarterNum - 1) * 3 + 1;
            const endMonth = quarterNum * 3;

            const startDate = `${year}-${startMonth.toString().padStart(2, '0')}-01`;
            const endDate = `${year}-${endMonth.toString().padStart(2, '0')}-31`;

            const invoices = this.savedDocs.filter(d =>
                d.type === 'Tax Invoice' &&
                d.date >= startDate &&
                d.date <= endDate
            );

            let totalTurnover = 0;
            invoices.forEach(inv => {
                const totals = this.getDocTotals(inv);
                totalTurnover += totals.total;
            });

            const taxRate = 0.01; // 1% for composition
            const taxPayable = totalTurnover * taxRate;

            return {
                turnover: totalTurnover,
                taxRate: taxRate * 100,
                taxPayable
            };
        },

        async calculateGSTR9(financialYear) {
            // Annual return - summary of all GSTR-1 and GSTR-3B
            const fyYear = parseInt(financialYear.split('-')[0].replace('FY', ''));
            const startDate = `${fyYear}-04-01`;
            const endDate = `${fyYear + 1}-03-31`;

            const gstr1Data = await this.calculateGSTR1(startDate, endDate);

            return {
                annualTurnover: gstr1Data.totalTaxable,
                annualGst: gstr1Data.totalGst,
                invoiceCount: gstr1Data.invoiceCount,
                b2bCount: gstr1Data.b2b.length,
                b2cCount: gstr1Data.b2c.length
            };
        },

        async saveGstFiling(returnType, period, data, status = 'Pending') {
            const frequency = this.gstSettings.filingFrequency;
            const dueDate = this.calculateGstDueDate(returnType, period, frequency);

            const filing = {
                user_id: this.user?.id,
                return_type: returnType,
                period,
                frequency,
                due_date: dueDate?.toISOString().split('T')[0],
                filed_date: status === 'Filed' ? new Date().toISOString().split('T')[0] : null,
                status,
                data
            };

            // Check if filing already exists
            const { data: existing, error: fetchError } = await window.supabase
                .from('gst_filings')
                .select('id')
                .eq('user_id', this.user?.id)
                .eq('return_type', returnType)
                .eq('period', period)
                .single();

            let error;
            if (existing) {
                // Update existing record
                const result = await window.supabase
                    .from('gst_filings')
                    .update(filing)
                    .eq('id', existing.id);
                error = result.error;
            } else {
                // Insert new record
                const result = await window.supabase
                    .from('gst_filings')
                    .insert(filing);
                error = result.error;
            }

            if (error) {
                console.error('Error saving GST filing:', error);
                alert('Failed to save filing: ' + error.message);
                return false;
            }

            await this.loadGstFilings();
            return true;
        },

        async loadGstFilings() {
            const { data, error } = await window.supabase
                .from('gst_filings')
                .select('*')
                .eq('user_id', this.user?.id)
                .order('due_date', { ascending: false });

            if (!error) {
                this.gstFilings = data || [];
            }
        },

        getFilingStatus(returnType, period) {
            const filing = this.gstFilings.find(f =>
                f.return_type === returnType && f.period === period
            );

            if (!filing) return 'Pending';

            const now = new Date();
            const dueDate = new Date(filing.due_date);

            if (filing.status === 'Filed') return 'Filed';
            if (now > dueDate) return 'Overdue';
            return 'Pending';
        },

        downloadGstReturnJSON(returnType, period, data) {
            if (!data) {
                alert('Please calculate the return first');
                return;
            }

            const filename = `${returnType}_${period}.json`;
            const jsonStr = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        },

        downloadGstReturnExcel(returnType, period, data) {
            if (!data) {
                alert('Please calculate the return first');
                return;
            }

            let csvContent = '';
            const filename = `${returnType}_${period}.csv`;

            if (returnType === 'GSTR-1') {
                csvContent = 'GSTR-1 Summary\n\n';
                csvContent += `Period,${period}\n`;
                csvContent += `Total Invoices,${data.invoiceCount}\n`;
                csvContent += `Total Taxable Value,${data.totalTaxable}\n`;
                csvContent += `Total GST,${data.totalGst}\n\n`;

                csvContent += 'B2B Invoices\n';
                csvContent += 'Invoice No,Date,Customer PO No,Customer PO Date,GSTIN,Customer Name,Taxable Value,IGST,CGST,SGST,Total GST\n';
                data.b2b.forEach(inv => {
                    csvContent += `${inv.number},${inv.date},${inv.poNumber},${inv.poDate},${inv.gstin},${inv.name},${inv.taxable},${inv.iamt || 0},${inv.camt || 0},${inv.samt || 0},${inv.gst}\n`;
                });

                csvContent += '\nSection 7 - B2C (Others) Aggregated\n';
                csvContent += 'Place of Supply,Rate,Taxable Value,IGST,CGST,SGST,Total GST\n';
                data.b2c.forEach(row => {
                    const totalGst = (row.iamt || 0) + (row.camt || 0) + (row.samt || 0);
                    csvContent += `${row.pos},${row.rt}%,${row.txval},${row.iamt},${row.camt},${row.samt},${totalGst}\n`;
                });

                if (data.hsnSummary) {
                    csvContent += '\nSection 12 - HSN Summary\n';
                    csvContent += 'HSN/SAC,Description,UQC,Quantity,Taxable Value,IGST,CGST,SGST,Total GST\n';
                    data.hsnSummary.forEach(h => {
                        const totalGst = (h.iamt || 0) + (h.camt || 0) + (h.samt || 0);
                        csvContent += `${h.hsn},Service/Product,${h.uqc},${h.qty},${h.txval},${h.iamt},${h.camt},${h.samt},${totalGst}\n`;
                    });
                }
            } else if (returnType === 'GSTR-3B') {
                csvContent = 'GSTR-3B Summary\n\n';
                csvContent += `Period,${period}\n`;
                csvContent += `Taxable Value,${data.outwardSupplies.taxableValue}\n`;
                csvContent += `IGST,${data.outwardSupplies.igst}\n`;
                csvContent += `CGST,${data.outwardSupplies.cgst}\n`;
                csvContent += `SGST,${data.outwardSupplies.sgst}\n`;
                csvContent += `Net Tax Liability,${data.netTaxLiability}\n`;
            } else if (returnType === 'CMP-08') {
                csvContent = 'CMP-08 Summary\n\n';
                csvContent += `Period,${period}\n`;
                csvContent += `Turnover,${data.turnover}\n`;
                csvContent += `Tax Rate,${data.taxRate}%\n`;
                csvContent += `Tax Payable,${data.taxPayable}\n`;
            } else if (returnType === 'GSTR-9') {
                csvContent = 'GSTR-9 Annual Summary\n\n';
                csvContent += `Financial Year,${period}\n`;
                csvContent += `Annual Turnover,${data.annualTurnover}\n`;
                csvContent += `Annual GST,${data.annualGst}\n`;
                csvContent += `Total Invoices,${data.invoiceCount}\n`;
                csvContent += `B2B Count,${data.b2bCount}\n`;
                csvContent += `B2C Count,${data.b2cCount}\n`;
            }

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
    }
}
